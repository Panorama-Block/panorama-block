use std::cell::RefCell;
use candid::Principal;
use ic_cdk::update;
use ic_stable_structures::{memory_manager::MemoryManager, DefaultMemoryImpl};

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static HASHBLOCK_CANISTER_ID: RefCell<Option<Principal>> = RefCell::new(None);
    static ADDRESSES_CANISTER_ID: RefCell<Option<Principal>> = RefCell::new(None);
    static TRANSACTIONS_CANISTER_ID: RefCell<Option<Principal>> = RefCell::new(None);
}

#[update]
fn set_hashblock_canister(canister_id: Principal) {
    HASHBLOCK_CANISTER_ID.with(|id| {
        *id.borrow_mut() = Some(canister_id)
    });
}

#[update]
fn set_addresses_canister(canister_id: Principal) {
    ADDRESSES_CANISTER_ID.with(|id| {
        *id.borrow_mut() = Some(canister_id)
    });
}

#[update]
fn set_transactions_canister(canister_id: Principal) {
    TRANSACTIONS_CANISTER_ID.with(|id| {
        *id.borrow_mut() = Some(canister_id)
    });
}

#[update]
async fn call_set_hashblock(hashblock_id: String) -> String {
    let canister_id = HASHBLOCK_CANISTER_ID.with(|id| *id.borrow());
    if let Some(canister_id) = canister_id {
        let call_result: Result<(), _> = ic_cdk::call(canister_id, "set_hashblock", (hashblock_id,)).await;
        match call_result {
            Ok(_) => "Hashblock definido com sucesso".to_string(),
            Err(err) => format!("Erro ao chamar set_hashblock: {:?}", err),
        }
    } else {
        "ID do canister Hashblock não definido".to_string()
    }
}

#[update]
async fn call_get_hashblock() -> String {
    let canister_id = HASHBLOCK_CANISTER_ID.with(|id| *id.borrow());
    if let Some(canister_id) = canister_id {
        let call_result: Result<(String,), _> = ic_cdk::call(canister_id, "get_hashblock", ()).await;
        match call_result {
            Ok((hashblock,)) => hashblock,
            Err(err) => format!("Erro ao chamar get_hashblock: {:?}", err),
        }
    } else {
        "ID do canister Hashblock não definido".to_string()
    }
}

#[update]
async fn call_create_address(address: String) -> String {
    let canister_id = ADDRESSES_CANISTER_ID.with(|id| *id.borrow());
    if let Some(canister_id) = canister_id {
        let call_result: Result<(String,), _> = ic_cdk::call(canister_id, "create_address", (address,)).await;
        match call_result {
            Ok((result,)) => result,
            Err(err) => format!("Erro ao chamar create_address: {:?}", err),
        }
    } else {
        "ID do canister Addresses não definido".to_string()
    }
}

#[update]
async fn call_get_address(address: String) -> String {
    let canister_id = ADDRESSES_CANISTER_ID.with(|id| *id.borrow());
    if let Some(canister_id) = canister_id {
        let call_result: Result<(String,), _> = ic_cdk::call(canister_id, "get_address", (address,)).await;
        match call_result {
            Ok((result,)) => result,
            Err(err) => format!("Erro ao chamar get_address: {:?}", err),
        }
    } else {
        "ID do canister Addresses não definido".to_string()
    }
}

#[update]
async fn call_get_transaction(txid: String) -> String {
    let canister_id = TRANSACTIONS_CANISTER_ID.with(|id| *id.borrow());
    if let Some(canister_id) = canister_id {
        let call_result: Result<(String,), _> = ic_cdk::call(canister_id, "get_transaction", (txid,)).await;
        match call_result {
            Ok((result,)) => result,
            Err(err) => format!("Erro ao chamar get_transaction: {:?}", err),
        }
    } else {
        "ID do canister Transactions não definido".to_string()
    }
}

#[update]
async fn call_append_transaction_to_stable(txid: String) -> String {
    let canister_id = TRANSACTIONS_CANISTER_ID.with(|id| *id.borrow());
    if let Some(canister_id) = canister_id {
        let call_result: Result<(String,), _> = ic_cdk::call(canister_id, "append_transaction_to_stable", (txid,)).await;
        match call_result {
            Ok((result,)) => result,
            Err(err) => format!("Erro ao chamar append_transaction_to_stable: {:?}", err),
        }
    } else {
        "ID do canister Transactions não definido".to_string()
    }
}
