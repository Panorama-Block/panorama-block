mod memory;
mod types;
mod config;

use candid::{decode_one, encode_one};
use ic_cdk::{api::management_canister::http_request::{http_request, CanisterHttpRequestArgument, HttpMethod}, query, update};
use ic_stable_structures::StableBTreeMap;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use types::Address;
use memory::Memory;
use config::{ADDRESSES_API_URL, default_headers};

#[derive(Serialize, Deserialize)]
struct State {
    #[serde(skip, default = "init_stable_addresses")]
    stable_addresses: StableBTreeMap<String, Vec<u8>, Memory>,
    current_address: Option<String>,
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default())
}

#[update]
pub fn set_address (address: String){
    STATE.with(|s| {
        s.borrow_mut().current_address = Some(address);
    });
}

#[query]
pub fn get_current_address() -> String {
    STATE.with(|s| {
        s.borrow().current_address.clone().unwrap_or_else(|| "No current address set".to_string())
    })
} 

#[update]
async fn get_address() -> String {
    let current = get_current_address();
    if current == "No current address set" {
        return current;
    }
    let url = format!("{}{}", ADDRESSES_API_URL, current);
    
    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: default_headers(),
    };
    
    match http_request(request, 1603126400).await {
        Ok((response,)) => match String::from_utf8(response.body) {
            Ok(str_body) => str_body,
            Err(_) => "Error: Failed to decode UTF-8 response".to_string(),
        },
        Err((r, m)) => format!("HTTP request error. RejectionCode: {:?}, Error: {}", r, m),
    }
}

#[update]
async fn append_current_address_to_stable() -> String {
    let current_address = get_current_address();

    if current_address == "No current address set" {
        return current_address;
    }
    
    let url = format!("{}{}", ADDRESSES_API_URL, current_address);

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: default_headers(),
    };

    let response = match http_request(request, 1603126400).await {
        Ok((response,)) => response,
        Err(_) => return "Request failed".to_string(),
    };

    let body_str = match String::from_utf8(response.body) {
        Ok(body) => body,
        Err(_) => return "Failed to decode response body".to_string(),
    };

    let address: Address = match serde_json::from_str(&body_str) {
        Ok(address) => address,
        Err(_) => return "Failed to parse JSON response".to_string(),
    };

    let serialized_address = match encode_one(&address) {
        Ok(serialized) => serialized,
        Err(_) => return "Failed to serialize address".to_string(),
    };

    STATE.with(|s| {
        let key: String = address.address.clone();
        s.borrow_mut().stable_addresses.insert(key, serialized_address);
    });

    "Address added to stable".to_string()
}

#[query]
fn get_stable_address_by_key(key: String) -> Address {
    STATE.with(|s| {
        match s.borrow().stable_addresses.get(&key) {
            Some(value) => match decode_one::<Address>(&value) {
                Ok(address) => address,
                Err(_) => Address::default(),
            },
            None => Address::default(),
        }
    })
}

#[query]
fn get_stable_addresses() -> Vec<Address> {
    STATE.with(|s| {
        let state = s.borrow();
        state.stable_addresses.iter().filter_map(|(_key, value)| decode_one::<Address>(&value).ok()).collect()
    })
}

fn init_stable_addresses() -> StableBTreeMap<String, Vec<u8>, Memory> {
    StableBTreeMap::init(crate::memory::get_stable_btree_memory())
}

impl Default for State {
    fn default() -> Self {
        Self {
            stable_addresses: init_stable_addresses(),
            current_address: None,
        }
    }
    
}

#[update]
fn delete_stable_addresses() -> String {
    STATE.with(|s| {
        s.borrow_mut().stable_addresses.clear_new();
    });

    "Stable addresses were clear".to_string()
}

#[update]
fn delete_stable_address_by_key(key: String) -> Address {
    STATE.with(|s| {
        let maybe_value = s.borrow_mut().stable_addresses.remove(&key);
        maybe_value.and_then(|value| decode_one::<Address>(&value).ok())
            .unwrap_or_default()
    })
}