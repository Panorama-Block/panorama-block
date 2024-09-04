use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Transaction {
    pub txid: String,
    pub version: u32,
    pub locktime: u32,
    pub vin: Vec<Input>,
    pub vout: Vec<Output>,
    pub size: u32,
    pub weight: u32,
    pub fee: u64,
    pub status: TransactionStatus,
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Input {
    // Adicione campos conforme necessário
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct Output {
    // Adicione campos conforme necessário
}

#[derive(CandidType, Serialize, Deserialize, Clone, Debug)]
pub struct TransactionStatus {
    pub confirmed: bool,
    pub block_height: u32,
    pub block_hash: String,
    pub block_time: u64,
}
