use candid::{decode_one, encode_one, CandidType};
use ic_cdk::api::management_canister::http_request::{http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod};
use ic_cdk_macros::{post_upgrade, pre_upgrade, query, update};
use ic_stable_structures::{writer::Writer, Memory as _, StableBTreeMap};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
mod memory;
use memory::Memory;

#[derive(Serialize, Deserialize)]
struct State {
    data_on_the_heap: Vec<u8>,

    #[serde(skip, default = "init_stable_data")]
    stable_data: StableBTreeMap<u128, Vec<u8>, Memory>,
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
    static STATE: RefCell<State> = RefCell::new(State::default());
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
    let current_hash = get_current_hashblock().ok_or("No current hashblock set")?;

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

/// Append hashblock to stable memory
#[update]
fn insert_hashblock(key: u128, block: Hashblock) -> Option<Hashblock> {
    STATE.with(|s| {
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
        let key = hash_to_u128(&block.id);
        s.borrow_mut().stable_data.insert(key, serialized_block);
    });

    Some("Hashblock appended successfully".to_string())
}
 // Convert block ID hash to u128 }

// A pre-upgrade hook for serializing the data stored on the heap.
#[pre_upgrade]
fn pre_upgrade() {
    let mut state_bytes = vec![];
    STATE.with(|s| ciborium::ser::into_writer(&*s.borrow(), &mut state_bytes))
        .expect("failed to encode state");

    let len = state_bytes.len() as u32;
    let mut memory = memory::get_upgrades_memory();
    let mut writer = Writer::new(&mut memory, 0);
    writer.write(&len.to_le_bytes()).unwrap();
    writer.write(&state_bytes).unwrap()
}

// A post-upgrade hook for deserializing the data back into the heap.
#[post_upgrade]
fn post_upgrade() {
    let memory = memory::get_upgrades_memory();

    let mut state_len_bytes = [0; 4];
    memory.read(0, &mut state_len_bytes);
    let state_len = u32::from_le_bytes(state_len_bytes) as usize;

    let mut state_bytes = vec![0; state_len];
    memory.read(4, &mut state_bytes);

    let state = ciborium::de::from_reader(&*state_bytes).expect("failed to decode state");
    STATE.with(|s| {
        *s.borrow_mut() = state
    });
}

fn init_stable_data() -> StableBTreeMap<u128, Vec<u8>, Memory> {
    StableBTreeMap::init(crate::memory::get_stable_btree_memory())
}

impl Default for State {
    fn default() -> Self {
        Self {
            data_on_the_heap: vec![],
            stable_data: init_stable_data(),
            current_hashblock: None,
        }
    }
}

#[query]
fn get_stable_hashblock_by_key(key: u128) -> Option<Hashblock> {
    STATE.with(|s| {
        s.borrow().stable_data.get(&key).and_then(|value| {
            decode_one::<Hashblock>(&value).ok()
        })
    })
}

fn hash_to_u128(hash: &str) -> u128 {
    let mut result = 0u128;
    for byte in hash.as_bytes().iter().take(16) {
        result = result << 8 | *byte as u128;
    }

    result
}

// TODO: get hashblocks from stable memory
// TODO: print a stable hashblock by key
// TODO: change insert to append current hashblock to stable
