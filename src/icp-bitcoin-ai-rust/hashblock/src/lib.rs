mod config;
mod types;
use config::{default_headers, HASHBLOCKS_API_URL, HASHBLOCK_API_URL};
use ic_cdk::{
    api::management_canister::http_request::{
        http_request, CanisterHttpRequestArgument, HttpMethod,
    },
    query, update,
};
use ic_stable_structures::{
    memory_manager::{MemoryId, MemoryManager, VirtualMemory},
    DefaultMemoryImpl, StableBTreeMap,
};
use std::cell::RefCell;
use types::{ApiHashblock, Hashblock};

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static HASHBLOCK_MAP: RefCell<StableBTreeMap<String, Hashblock, Memory>> = RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))));
    static CURRENT_HASHBLOCK: RefCell<Option<String>> = RefCell::new(None);
}

#[update]
pub fn set_hashblock(hash: String) {
    CURRENT_HASHBLOCK.with(|current| {
        *current.borrow_mut() = Some(hash);
    });
    // TODO: function send message to other caninsters
}

#[query]
pub fn get_current_hashblock() -> String {
    CURRENT_HASHBLOCK.with(|current| {
        current
            .borrow()
            .clone()
            .unwrap_or_else(|| "No current hashblock set".to_string())
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

    HASHBLOCK_MAP.with(|map| {
        map.borrow_mut().insert(block.id.clone(), block);
    });

    "Hashblock appended successfully".to_string()
}

#[query]
fn get_stable_hashblock_by_key(key: String) -> Option<Hashblock> {
    HASHBLOCK_MAP.with(|map| map.borrow().get(&key).clone())
}

#[query]
fn get_all_stable_hashblocks() -> Vec<Hashblock> {
    HASHBLOCK_MAP.with(|map| {
        map.borrow()
            .iter()
            .map(|(_, value)| value.clone())
            .collect()
    })
}

#[update]
async fn set_newest_hashblock_into_current() -> String {
    let request = CanisterHttpRequestArgument {
        url: HASHBLOCKS_API_URL.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: default_headers(),
    };

    let response = match http_request(request, 1_603_088_800).await {
        Ok((response,)) => response,
        Err(err) => return format!("Request Failed: {:?}", err),
    };

    let body_str = match String::from_utf8(response.body) {
        Ok(body) => body,
        Err(_) => return "Failed to decode response body".to_string(),
    };

    let blocks: Vec<ApiHashblock> = match serde_json::from_str(&body_str) {
        Ok(blocks) => blocks,
        Err(_) => return "Failed to parse JSON response".to_string(),
    };

    HASHBLOCK_MAP.with(|map| {
        let mut map = map.borrow_mut();
        CURRENT_HASHBLOCK.with(|current_hash| {
            let mut current_hash = current_hash.borrow_mut();

            for block in blocks {
                if !map.contains_key(&block.id) {
                    let hashblock = Hashblock {
                        id: block.id.clone(),
                        height: block.height,
                        version: block.version,
                        timestamp: block.timestamp,
                        tx_count: block.tx_count,
                        size: block.size,
                        weight: block.weight,
                        merkle_root: block.merkle_root.clone(),
                        previousblockhash: block.previousblockhash.clone(),
                        mediantime: block.mediantime,
                        nonce: block.nonce,
                        bits: block.bits,
                        difficulty: block.difficulty,
                    };

                    map.insert(block.id.clone(), hashblock);
                    *current_hash = Some(block.previousblockhash);
                } else {
                    *current_hash = Some(block.previousblockhash);
                }
            }
        })
    });

    "Hashblocks updated successfully".to_string()
}

#[update]
fn delete_stable_hasblocks() -> String {
    HASHBLOCK_MAP.with(|map| map.borrow_mut().clear_new());

    "Stable hashblocks were clear".to_string()
}

#[update]
fn delete_stable_hashblock_by_key(key: String) -> Option<Hashblock> {
    HASHBLOCK_MAP.with(|map| map.borrow_mut().remove(&key))
}