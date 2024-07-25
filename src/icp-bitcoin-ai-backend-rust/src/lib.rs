use candid::{decode_one, encode_one, CandidType};
use ic_cdk::{api::management_canister::http_request::{http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod}, query, update};
use ic_stable_structures::StableBTreeMap;
use serde::{Deserialize, Serialize};
use std::{borrow::Borrow, cell::RefCell};
mod memory;
use memory::Memory;

#[derive(Serialize, Deserialize)]
struct State {
    #[serde(skip, default = "init_stable_data")]
    stable_data: StableBTreeMap<String, Vec<u8>, Memory>,
    current_hashblock: Option<String>,
}

#[derive(Serialize, Deserialize, CandidType, Clone)]
struct Hashblock {
    id: String,
    height: f64,
    version: f64,
    timestamp: f64,
    tx_count: f64,
    size: f64,
    weight: f64,
    merkle_root: String,
    previousblockhash: String,
    mediantime: f64,
    nonce: f64,
    bits: f64,
    difficulty: f64,
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default())
}

#[update]
fn set_hashblock(hash: String) {
    STATE.with(|s| {
        s.borrow_mut().current_hashblock = Some(hash);
    })
}

#[query]
fn get_current_hashblock() -> Option<String> {
    STATE.with(|s| {
        s.borrow().current_hashblock.clone()
    })
}

#[update]
async fn get_hashblock() -> Result<String, String> {
    let current_hash = get_current_hashblock().ok_or("No current hashblock has been set")?;

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
           Err(_) => Err("Failed to decode UTF-8 response".to_string())
        }

        Err((r, m)) => {
            let message = format!("HTTP request error. RejectionCode: {r:?}, Error: {m}");
            Err(message)
        }
    }
}

/// Append hashblock to stable memory
#[update]
fn insert_hashblock(block: Hashblock) -> Option<Hashblock> {
    STATE.with(|s| {
        let key = block.id.clone();
        let bytes = encode_one(&block).expect("Failed to serialize Hashblock");
        s.borrow_mut().stable_data.insert(key, bytes)
            .and_then(|old_bytes| decode_one::<Hashblock>(&old_bytes).ok())
    })
}

#[update]
async fn append_current_hashblock_to_stable() -> Option<String> {
    let current_hash = match get_current_hashblock() {
        Some(hash) => hash,
        None => return None,
    };

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

    let response = match http_request(request, 1603126400).await {
        Ok((response,)) => response,
        Err(_) => return None,
    };

    let body_str = match String::from_utf8(response.body) {
        Ok(str) => str,
        Err(_) => return None,
    };

    let block: Hashblock = match serde_json::from_str(&body_str) {
        Ok(block) => block,
        Err(_) => return None,
    };

    let serialized_block = match encode_one(&block) {
        Ok(bytes) => bytes,
        Err(_) => return None,
    };

    STATE.with(|s| {
        let key = block.id.clone();
        s.borrow_mut().stable_data.insert(key, serialized_block);
    });

    Some("Hashblock appended successfully".to_string())
}

#[query]
fn get_stable_hashblock_by_key(key: String) -> Option<Hashblock> {
    STATE.with(|s| {
        s.borrow().stable_data.get(&key).and_then(|value| {
            decode_one::<Hashblock>(&value).ok()
        })
    })
}

fn init_stable_data() -> StableBTreeMap<String, Vec<u8>, Memory> {
    StableBTreeMap::init(crate::memory::get_stable_btree_memory())
}

impl Default for State {
    fn default() -> Self {
        Self {
            stable_data: init_stable_data(),
            current_hashblock: None,
        }
    }
}
