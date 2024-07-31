use candid::Principal;
use ic_cdk::update;

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
