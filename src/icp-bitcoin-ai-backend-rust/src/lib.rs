use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
};

use candid::{CandidType, Deserialize};
use ic_cdk::{init, post_upgrade, pre_upgrade};
use ic_stable_memory::collections::SVec;
use ic_stable_memory::derive::{AsFixedSizeBytes, StableType};
use ic_stable_memory::{retrieve_custom_data, stable_memory_init, stable_memory_post_upgrade, stable_memory_pre_upgrade, store_custom_data, SBox};
use std::cell::RefCell;
use std::panic::catch_unwind;

#[derive(CandidType, Deserialize, StableType, Debug, Clone, AsFixedSizeBytes)]
struct Hashblock {
    id: u128,
    height: f64,
    version: f64,
    timestamp: f64,
    tx_count: f64,
    size: f64,
    weight: f64,
    merkle_root: u128,
    previous_hashblock: u128,
    mediantime: f64,
    nonce: f64,
    bits: f64,
    difficulty: f64,
}

type Hashblocks = SVec<SBox<Hashblock>>;

thread_local! {
    static CURRENT_HASHBLOCK: RefCell<CurrentHashblock> = RefCell::new(CurrentHashblock::new(String::new()));
    static HASHBLOCKS: RefCell<Option<Hashblocks>> = RefCell::new(None);
}

struct CurrentHashblock {
    hash: String,
}

impl CurrentHashblock {
    pub fn new(hash: String) -> Self {
        Self { hash }
    }

    pub fn update(&mut self, new_hash: String) {
        self.hash = new_hash;
    }

    pub fn get_hash(&self) -> &String {
        &self.hash
    }
}

#[ic_cdk::update]
async fn get_hashblock() -> Result<String, String> {
    let current_hash = CURRENT_HASHBLOCK.with(|current| current.borrow().get_hash().clone());

    let url = format!("https://mempool.space/api/block/{}", current_hash);

    let request_headers = vec![HttpHeader {
        name: "User-Agent".to_string(),
        value: "https://panoramablock.com".to_string(),
    }];

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: request_headers,
    };

    match http_request(request, 1603126400).await {
        Ok((response,)) => match String::from_utf8(response.body) {
            Ok(str_body) => Ok(str_body),
            Err(_) => Err("Failed to decode UTF-8 response".to_string()),
        },

        Err((r, m)) => {
            let message = format!("HTTP request error. RejectionCode: {r:?}, Error: {m}");
            Err(message)
        }
    }
}

#[ic_cdk::update]
async fn set_hashblock(hash_block: String) -> Result<String, String> {
    let result = catch_unwind(|| {
        CURRENT_HASHBLOCK.with(|current| {
            current.borrow_mut().update(hash_block);
        });
    });
    match result {
        Ok(_) => Ok("Hash block was set successfully".to_string()),
        Err(_) => Err("Err to set Hash block".to_string()),
    }
}

#[ic_cdk::update]
async fn get_set_hashblock() -> String {
    CURRENT_HASHBLOCK.with(|current| current.borrow().get_hash().clone())
}

#[ic_cdk::update]
fn append_hashblock_to_stable() -> Result<String, String> {
    let current_hash = CURRENT_HASHBLOCK.with(|current| current.borrow().get_hash().clone());

    let id = hash_to_u128(&current_hash);
    let merkle_root = 0u128;
    let previous_hashblock = 0u128;

    let new_block = Hashblock {
        id,
        height: 0.0,
        version: 0.0,
        timestamp: 0.0,
        tx_count: 0.0,
        size: 0.0,
        weight: 0.0,
        merkle_root,
        previous_hashblock,
        mediantime: 0.0,
        nonce: 0.0,
        bits: 0.0,
        difficulty: 0.0,
    };

    let boxed_block = SBox::new(new_block).map_err(|_| "Out of memory")?;
    HASHBLOCKS.with(|hashblocks| {
        if let Some(ref mut hashblocks) = *hashblocks.borrow_mut() {
            hashblocks.push(boxed_block).map_err(|_| "Failed to append hash block")?;
        }
        Ok::<(), String>(())
    })?;

    Ok("Hash block was appended successfully".to_string())
}

fn hash_to_u128(hash: &str) -> u128 {
    let bytes = hash.as_bytes();
    let mut result = 0u128;
    for &byte in bytes.iter().take(10) {
        result = (result << 8) | byte as u128;
    }
    result
}

#[init]
fn init() {
    stable_memory_init();

    HASHBLOCKS.with(|s| {
        *s.borrow_mut() = Some(SVec::new());
    });
}

// #[pre_upgrade]
// fn pre_upgrade() {
//   let state: Hashblocks = HASHBLOCKS.with(|s| s.borrow_mut().take().unwrap());
//   let boxed_state = SBox::new(state).expect("Out of memory");

//   store_custom_data(0, boxed_state);

//   stable_memory_pre_upgrade().expect("Out of memory");
// }

// #[post_upgrade]
// fn post_upgrade() {
//   stable_memory_post_upgrade();

//   let state = retrieve_custom_data::<Hashblocks>(0).unwrap().into_inner();
//   HASHBLOCKS.with(|s| {
//     *s.borrow_mut() = Some(state);
//   });
// }

// TODO: get output from get_set_hash_block into a stable variable
