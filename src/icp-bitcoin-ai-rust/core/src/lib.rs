use std::cell::RefCell;
use candid::Principal;
use ic_cdk::update;
use ic_stable_structures::{memory_manager::MemoryManager, DefaultMemoryImpl};

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static HASHBLOCK_CANISTER_ID: RefCell<Option<Principal>> = RefCell::new(None);
}

#[update]
fn set_hashblock_canister(canister_id: Principal) {
    HASHBLOCK_CANISTER_ID.with(|id| {
        *id.borrow_mut() = Some(canister_id)
    });
}

#[update]
async fn call_set_hashblock(hashblock_id: String) -> String {
    let canister_id = HASHBLOCK_CANISTER_ID.with(|id| *id.borrow());
    if let Some(canister_id) = canister_id {
        let call_result: Result<(), _> = ic_cdk::call(canister_id, "set_hashblock", (hashblock_id,)).await;
        match call_result {
            Ok(_) => "We gucci".to_string(),
            Err(err) => format!("Error calling set_hashblock: {:?}", err),
        }
    } else {
        "Hashblock canister ID not set".to_string()
    }
}

#[update]
async fn call_get_hashblock() -> String {
    let canister_id = HASHBLOCK_CANISTER_ID.with(|id| *id.borrow());
    if let Some(canister_id) = canister_id {
        let call_result: Result<(String,), _> = ic_cdk::call(canister_id, "get_hashblock", ()).await;
        match call_result {
            Ok((hashblock,)) => hashblock,
            Err(err) => format!("Error calling get_hashblock: {:?}", err),
        }
    } else {
        "Hashblock canister ID not set".to_string()
    }
}
