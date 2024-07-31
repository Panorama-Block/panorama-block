use candid::CandidType;
use serde::{Deserialize, Serialize};

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
