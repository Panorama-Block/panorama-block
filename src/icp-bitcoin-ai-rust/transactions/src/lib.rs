use candid::{CandidType, Deserialize};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap, Storable};
use std::{borrow::Cow, cell::RefCell};

type Memory = VirtualMemory<DefaultMemoryImpl>;

const TRANSACTIONS_MEM_ID: MemoryId = MemoryId::new(0);

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(
        MemoryManager::init(DefaultMemoryImpl::default())
    );

    static TRANSACTIONS: RefCell<StableBTreeMap<String, Transaction, Memory>> = RefCell::new(
        StableBTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(TRANSACTIONS_MEM_ID))
        )
    );
}

#[derive(CandidType, Deserialize, Clone)]
struct Transaction {
    txid: String,
    version: f64,
    locktime: f64,
    size: f64,
    // Adicione mais campos conforme necessário
}

impl Storable for Transaction {

    const BOUND: ic_stable_structures::storable::Bound = ic_stable_structures::storable::Bound::Unbounded;

    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(candid::encode_one(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        candid::decode_one(&bytes).unwrap()
    }
}

#[ic_cdk::update]
fn create_transaction(txid: String, version: f64, locktime: f64, size: f64) -> String {
    let new_transaction = Transaction {
        txid: txid.clone(),
        version,
        locktime,
        size,
    };
    TRANSACTIONS.with(|transactions| {
        transactions.borrow_mut().insert(txid.clone(), new_transaction)
    });
    "Transaction created successfully".to_string()
}

#[ic_cdk::query]
fn get_transaction(txid: String) -> Option<Transaction> {
    TRANSACTIONS.with(|transactions| transactions.borrow().get(&txid))
}

#[ic_cdk::update]
fn update_transaction(txid: String, version: f64, locktime: f64, size: f64) -> String {
    TRANSACTIONS.with(|transactions| {
        let mut transactions = transactions.borrow_mut();
        if let Some(mut transaction) = transactions.get(&txid) {
            transaction.version = version;
            transaction.locktime = locktime;
            transaction.size = size;
            transactions.insert(txid, transaction);
            "Transaction updated successfully".to_string()
        } else {
            "Transaction not found".to_string()
        }
    })
}

#[ic_cdk::query]
fn list_transactions() -> Vec<Transaction> {
    TRANSACTIONS.with(|transactions| transactions.borrow().iter().map(|(_, v)| v.clone()).collect())
}

#[ic_cdk::update]
fn delete_transaction(txid: String) -> String {
    TRANSACTIONS.with(|transactions| {
        if transactions.borrow_mut().remove(&txid).is_some() {
            "Transaction deleted successfully".to_string()
        } else {
            "Transaction not found".to_string()
        }
    })
}

// Candid interface
ic_cdk::export_candid!();