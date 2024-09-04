use ic_cdk::api::management_canister::http_request::HttpHeader;

pub const HASHBLOCK_API_URL: &str = "https://mempool.space/api/block/";
pub const HASHBLOCKS_API_URL: &str = "https://api.mempool.space/api/blocks/";

pub fn default_headers() -> Vec<HttpHeader> {
    vec![HttpHeader {
        name: "User-Agent".to_string(),
        value: "https://panoramablock.com".to_string(),
    }]
}