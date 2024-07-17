use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
};

use candid::{CandidType, Deserialize};
use ic_stable_memory::collections::SVec;
use ic_stable_memory::derive::StableType;
use ic_stable_memory::SBox;
use std::cell::RefCell;
use std::panic::catch_unwind;

#[derive(CandidType, Deserialize, StableType, Debug, Clone)]
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

type __Hashblocks = SVec<SBox<Hashblock>>;

thread_local! {
    static CURRENT_HASHBLOCK: RefCell<CurrentHashblock> = RefCell::new(CurrentHashblock::new(String::new()));
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
async fn get_hashblock(hash_block: String) -> String {
    let url = format!("https://mempool.space/api/block/{hash_block}/txs");

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
        Ok((response,)) => {
            let str_body = String::from_utf8(response.body)
                .expect("Transformed response is not UTF-8 encoded.");
            str_body
        }

        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");
            message
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
async fn get_set_hash_block() -> String {
    CURRENT_HASHBLOCK.with(|current| {
        current.borrow().get_hash().clone()
    })
}

// TODO: use set_hashblock as parameter to get_hash_block
// TODO: get output from get_set_hash_block into a stable variable
