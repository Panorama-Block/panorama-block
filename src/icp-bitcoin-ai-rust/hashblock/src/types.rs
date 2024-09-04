use std::borrow::Cow;

use candid::{CandidType, Decode, Encode};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};

const MAX_VALUE_SIZE: u32 = 10000;

#[derive(Serialize, Deserialize, CandidType, Clone, Debug, Default)]
pub struct Hashblock {
    pub id: String,
    pub height: f64,
    pub version: f64,
    pub timestamp: f64,
    pub tx_count: f64,
    pub size: f64,
    pub weight: f64,
    pub merkle_root: String,
    pub previousblockhash: String,
    pub mediantime: f64,
    pub nonce: f64,
    pub bits: f64,
    pub difficulty: f64,
}

#[derive(Deserialize, Serialize, Debug, Clone)]
pub struct ApiHashblock {
    pub id: String,
    pub height: f64,
    pub version: f64,
    pub timestamp: f64,
    pub tx_count: f64,
    pub size: f64,
    pub weight: f64,
    pub merkle_root: String,
    pub previousblockhash: String,
    pub mediantime: f64,
    pub nonce: f64,
    pub bits: f64,
    pub difficulty: f64,
}

impl Storable for Hashblock {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Bounded {
        max_size: MAX_VALUE_SIZE,
        is_fixed_size: false,
    };
}
