pub fn hash_to_u128(hash: &str) -> u128 {
    let mut result = 0u128;
    for byte in hash.as_bytes().iter().take(16) {
        result = result << 8 | *byte as u128;
    }
    result
}
