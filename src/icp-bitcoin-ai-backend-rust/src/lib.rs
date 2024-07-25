mod memory;
mod types;
mod config;
use candid::{decode_one, encode_one};
use ic_cdk::{api::management_canister::http_request::{http_request, CanisterHttpRequestArgument, HttpMethod}, query, update};
use ic_stable_structures::StableBTreeMap;
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use types::Hashblock;
use memory::Memory;
use config::{API_URL, default_headers};

#[derive(Serialize, Deserialize)]
struct State {
    #[serde(skip, default = "init_stable_hashblock")]
    stable_hashblock: StableBTreeMap<String, Vec<u8>, Memory>,
    current_hashblock: Option<String>,
}

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default())
}

/// Sets the current hashblock to the given hash value.
///
/// This function updates the `current_hashblock` in the application state to the provided hash value.
///
/// # Parameters
///
/// - `hash`: A `String` representing the new hash value to be set.
///
/// # Examples
///
/// ```
/// set_hashblock("new_hash_value".to_string());
/// ```
#[update]
fn set_hashblock(hash: String) {
    STATE.with(|s| {
        s.borrow_mut().current_hashblock = Some(hash);
    })
}

/// Retrieves the current hashblock.
///
/// This function returns the current hashblock from the application state.
///
/// # Returns
///
/// - `Option<String>`: The current hashblock, if it has been set.
///
/// # Examples
///
/// ```
/// let current_hash = get_current_hashblock();
/// ```
#[query]
fn get_current_hashblock() -> Option<String> {
    STATE.with(|s| {
        s.borrow().current_hashblock.clone()
    })
}

/// Fetches the current hashblock from a remote server.
///
/// This function constructs a URL using the current hashblock and sends an HTTP GET request to fetch it.
///
/// # Returns
///
/// - `Result<String, String>`: The response body as a string if the request is successful, otherwise an error message.
///
/// # Examples
///
/// ```
/// let response = get_hashblock().await;
/// ```
#[update]
async fn get_hashblock() -> Result<String, String> {
    let current_hash = get_current_hashblock().ok_or("No current hashblock has been set")?;
    let url = format!("{}{}", API_URL, current_hash);

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: default_headers(),
    };

    match http_request(request, 1603126400).await {
        Ok((response,)) => match String::from_utf8(response.body) {
           Ok(str_body) => Ok(str_body),
           Err(_) => Err("Failed to decode UTF-8 response".to_string())
        }

        Err((r, m)) => {
            let message = format!("HTTP request error. RejectionCode: {r:?}, Error: {m}");
            Err(message)
        }
    }
}

/// Appends the current hashblock to the stable storage.
///
/// This function fetches the current hashblock from a remote server and appends it to the `stable_hashblock`.
///
/// # Returns
///
/// - `Option<String>`: A message indicating the operation was successful, or `None` if it failed.
///
/// # Examples
///
/// ```
/// let result = append_current_hashblock_to_stable().await;
/// ```
#[update]
async fn append_current_hashblock_to_stable() -> Option<String> {
    let current_hash = get_current_hashblock()?;
    let url = format!("{}{}", API_URL, current_hash);

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: default_headers(),
    };

    let response = match http_request(request, 1603126400).await {
        Ok((response,)) => response,
        Err(_) => return None,
    };

    let body_str = String::from_utf8(response.body).ok()?;
    let block: Hashblock = serde_json::from_str(&body_str).ok()?;
    let serialized_block = encode_one(&block).ok()?;

    STATE.with(|s| {
        let key = block.id.clone();
        s.borrow_mut().stable_hashblock.insert(key, serialized_block);
    });

    Some("Hashblock appended successfully".to_string())
}

/// Retrieves a `Hashblock` from the stable storage by the given key.
///
/// This function fetches a `Hashblock` from the `stable_hashblock` based on the provided key.
///
/// # Parameters
///
/// - `key`: A `String` representing the key of the `Hashblock` to be retrieved.
///
/// # Returns
///
/// - `Option<Hashblock>`: The `Hashblock` associated with the given key, if it exists.
///
/// # Examples
///
/// ```
/// let key = "example_key".to_string();
/// let hashblock = get_stable_hashblock_by_key(key);
/// ```
#[query]
fn get_stable_hashblock_by_key(key: String) -> Option<Hashblock> {
    STATE.with(|s| {
        s.borrow().stable_hashblock.get(&key).and_then(|value| {
            decode_one::<Hashblock>(&value).ok()
        })
    })
}

/// Retrieves all `Hashblock`s from the stable storage.
///
/// This function returns a list of all `Hashblock`s stored in the `stable_hashblock`.
///
/// # Returns
///
/// - `Vec<Hashblock>`: A vector containing all `Hashblock`s in the stable storage.
///
/// # Examples
///
/// ```
/// let all_hashblocks = get_all_stable_hashblocks();
/// ```
#[query]
fn get_all_stable_hashblocks() -> Vec<Hashblock> {
    STATE.with(|s| {
        let state = s.borrow();
        state.stable_hashblock.iter().filter_map(|(_key, value)| decode_one::<Hashblock>(&value).ok()).collect()
    })
}

/// Initializes the `stable_hashblock` storage.
///
/// This function initializes the `stable_hashblock` using the memory defined in the `memory` module.
///
/// # Returns
///
/// - `StableBTreeMap<String, Vec<u8>, Memory>`: An initialized `StableBTreeMap` instance.
///
/// # Examples
///
/// ```
/// let stable_hashblock = init_stable_hashblock();
/// ```
fn init_stable_hashblock() -> StableBTreeMap<String, Vec<u8>, Memory> {
    StableBTreeMap::init(crate::memory::get_stable_btree_memory())
}

impl Default for State {
    fn default() -> Self {
        Self {
            stable_hashblock: init_stable_hashblock(),
            current_hashblock: None,
        }
    }
}

/// Clears the `stable_hashblock` and returns a message indicating the operation was successful.
///
/// This function uses a query to clear the `stable_hashblock` in the application state.
/// It borrows the state mutably and clears the `stable_hashblock`.
///
/// # Returns
///
/// - `Option<String>`: A message indicating that the `stable_hashblock` has been cleared.
///
/// # Examples
///
/// ```
/// let result = delete_stable_hashblocks();
/// assert_eq!(result, Some("Stable hashblocks were clear".to_string()));
/// ```
#[update]
fn delete_stable_hasblocks() -> Option<String> {
    STATE.with(|s| {
        s.borrow_mut().stable_hashblock.clear_new();
    });

    Some("Stable hashblocks were clear".to_string())
}

/// Deletes an entry in the `stable_hashblock` by the given key and returns the corresponding `Hashblock` if it exists.
///
/// This function uses a query to remove an entry from the `stable_hashblock` based on the provided key.
/// It borrows the state mutably and attempts to remove the entry corresponding to the key.
/// If the entry exists, it decodes the value into a `Hashblock` and returns it.
///
/// # Parameters
///
/// - `key`: A `String` representing the key of the `Hashblock` to be removed.
///
/// # Returns
///
/// - `Option<Hashblock>`: The `Hashblock` associated with the given key, if it exists.
///
/// # Examples
///
/// ```
/// let key = "example_key".to_string();
/// let hashblock = delete_stable_hashblock_by_key(key);
/// match hashblock {
///     Some(block) => println!("Deleted hashblock: {:?}", block),
///     None => println!("No hashblock found for the given key"),
/// }
/// ```
#[update]
fn delete_stable_hashblock_by_key(key: String) -> Option<Hashblock> {
    STATE.with(|s| {
        s.borrow_mut().stable_hashblock.remove(&key).and_then(|value| {
            decode_one::<Hashblock>(&value).ok()
        })
    })
}
