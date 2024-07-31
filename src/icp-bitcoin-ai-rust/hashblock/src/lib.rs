mod memory;
mod types;
mod config;
use candid::{decode_one, encode_one};
use ic_cdk::{api::management_canister::http_request::{http_request, CanisterHttpRequestArgument, HttpMethod}, query, update};
use ic_stable_structures::StableBTreeMap;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use types::Hashblock;
use memory::Memory;
use config::{HASHBLOCK_API_URL, default_headers};

#[derive(Serialize, Deserialize)]
struct State {
    #[serde(skip, default = "init_stable_hashblock")]
    stable_hashblock: StableBTreeMap<String, Vec<u8>, Memory>,
    current_hashblock: Option<String>,
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default())
}

#[update]
pub fn set_hashblock(hash: String) {
    STATE.with(|s| {
        s.borrow_mut().current_hashblock = Some(hash);
    })

    // TODO: function send message to other caninsters
}

#[query]
pub fn get_current_hashblock() -> String {
    STATE.with(|s| {
        s.borrow().current_hashblock.clone().unwrap_or_else(|| "No current hashblock set".to_string())
    })
}

#[update]
async fn get_hashblock() -> String {
    let current_hash = get_current_hashblock();
    if current_hash == "No current hashblock set" {
        return current_hash;
    }

    let url = format!("{}{}", HASHBLOCK_API_URL, current_hash);
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
async fn append_current_hashblock_to_stable() -> String {
    let current_hash = get_current_hashblock();
    if current_hash == "No current hashblock set" {
        return current_hash.to_string();
    }
    let url = format!("{}{}", HASHBLOCK_API_URL, current_hash);

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

    let block: Hashblock = match serde_json::from_str(&body_str) {
        Ok(block) => block,
        Err(_) => return "Failed to parse JSON response".to_string(),
    };

    let serialized_block = match encode_one(&block) {
        Ok(serialized) => serialized,
        Err(_) => return "Failed to serialize hashblock".to_string(),
    };

    STATE.with(|s| {
        let key = block.id.clone();
        s.borrow_mut().stable_hashblock.insert(key, serialized_block);
    });

    "Hashblock appended successfully".to_string()
}

#[query]
fn get_stable_hashblock_by_key(key: String) -> Hashblock {
    STATE.with(|s| {
        match s.borrow().stable_hashblock.get(&key) {
            Some(value) => match decode_one::<Hashblock>(&value) {
                Ok(hashblock) => hashblock,
                Err(_) => Hashblock::default(),
            },
            None => Hashblock::default()
        }
    })
}

#[query]
fn get_all_stable_hashblocks() -> Vec<Hashblock> {
    STATE.with(|s| {
        let state = s.borrow();
        state.stable_hashblock.iter().filter_map(|(_key, value)| decode_one::<Hashblock>(&value).ok()).collect()
    })
}

fn init_stable_hashblock() -> StableBTreeMap<String, Vec<u8>, Memory> {
    StableBTreeMap::init(crate::memory::get_stable_btree_memory())
}

impl Default for State {
    fn default() -> Self {
        Self {
            stable_hashblock: init_stable_hashblock(),
            current_hashblock: None,
        }
    }
}

#[update]
fn delete_stable_hasblocks() -> String {
    STATE.with(|s| {
        s.borrow_mut().stable_hashblock.clear_new();
    });

    "Stable hashblocks were clear".to_string()
}

#[update]
fn delete_stable_hashblock_by_key(key: String) -> Hashblock {
    STATE.with(|s| {
        let maybe_value = s.borrow_mut().stable_hashblock.remove(&key);
        maybe_value.and_then(|value| decode_one::<Hashblock>(&value).ok())
            .unwrap_or_default()
    })
}
