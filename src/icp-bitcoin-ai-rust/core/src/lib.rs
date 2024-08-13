use std::{borrow::Cow, cell::RefCell};
use candid::{CandidType, Decode, Deserialize, Encode, Principal};
use ic_cdk::update;
use ic_stable_structures::{memory_manager::{MemoryId, MemoryManager, VirtualMemory}, storable::Bound, DefaultMemoryImpl, StableBTreeMap, Storable};

type Memory = VirtualMemory<DefaultMemoryImpl>;

const MAX_VALUE_SIZE: u32 = 100;

#[derive(CandidType, Deserialize)]
struct UserProfile {
    age: u8,
    name: String,
}

impl Storable for UserProfile {
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

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> = RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
    static MAP: RefCell<StableBTreeMap<u64, UserProfile, Memory>> = RefCell::new(StableBTreeMap::init(MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))));
}

#[ic_cdk::query]
fn get(key: u64) -> Option<UserProfile> {
    MAP.with(|p| p.borrow().get(&key))
}

#[ic_cdk::update]
fn insert(key: u64, value: UserProfile) -> Option<UserProfile> {
    MAP.with(|p| p.borrow_mut().insert(key, value))
}

#[ic_cdk::query]
fn greet(name: String) -> String {
    format!("Hello, {}!", name)
}

#[update]
async fn call_set_hashblock(canister_id: Principal, hashblock_id: String) -> String {
    let _call_result: Result<(), _> =
        ic_cdk::call(canister_id, "set_hashblock", (hashblock_id,)).await;
    "We gucci".to_string()
}

#[update]
async fn call_get_hashblock(canister_id: Principal) -> String {
    let call_result: Result<(String,), _> = ic_cdk::call(canister_id, "get_hashblock", ()).await;
    match call_result {
        Ok((hashblock,)) => hashblock,
        Err(err) => format!("Error calling get_hashblock: {:?}", err)
    }
}
