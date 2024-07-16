use ic_cdk::api::management_canister::http_request::{
    http_request, CanisterHttpRequestArgument, HttpHeader, HttpMethod,
};

#[ic_cdk::update]
async fn get_hash_block(hash_block: String) -> String {
    let url = format!("https://mempool.space/api/block/{hash_block}/txs");

    let request_headers = vec![
        HttpHeader {
            name: "User-Agent".to_string(),
            value: "https://panoramablock.com".to_string(),
        },
    ];

    let request = CanisterHttpRequestArgument {
        url: url.to_string(),
        method: HttpMethod::GET,
        body: None,
        max_response_bytes: None,
        transform: None,
        headers: request_headers,
    };

    match http_request(request, 1603126400).await {
        Ok((response,)) => {
            let str_body = String::from_utf8(response.body)
                .expect("Transformed response is not UTF-8 encoded.");
            str_body
        }

        Err((r, m)) => {
            let message =
                format!("The http_request resulted into error. RejectionCode: {r:?}, Error: {m}");
            message
        }
    }
}
