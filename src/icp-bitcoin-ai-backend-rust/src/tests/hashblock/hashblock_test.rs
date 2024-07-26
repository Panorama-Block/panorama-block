use crate::{set_hashblock, get_current_hashblock};

#[test]
fn test_set_hashblock() {
    let test_hash = "0000000000000000000bbaa998877665544332211".to_string();

    set_hashblock(test_hash.clone());
    let result = get_current_hashblock();

    assert_eq!(result, Some(test_hash));
}
