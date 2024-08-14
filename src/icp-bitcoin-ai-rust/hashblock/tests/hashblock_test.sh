#!core/bin/bash

CANISTER_ID="hashblock"
HASHBLOCK="0000000000000000000155a9029badd7fe1262e3fa2fdeb13a09236803b60d59"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Status flag to check if all tests passed
all_tests_passed=true

# Function to test the set_hashblock function
function test_set_hashblock {
    echo "Testing set_hashblock function..."
    result=$(dfx canister call $CANISTER_ID set_hashblock "\"$HASHBLOCK\"")
    echo "Result: $result"

    # Check the result
    if [[ "$result" == "()"* ]]; then
        echo -e "${GREEN}Test PASSED: set_hashblock executed successfully.${NC}"
    else
        echo -e "${RED}Test FAIL: set_hashblock did not return the expected.${NC}"
        all_tests_passed=false
    fi
}

# Function to test the get_current_hashblock function
function test_get_current_hashblock {
    echo "Testing the get_current_hashblock function..."
    result=$(dfx canister call $CANISTER_ID get_current_hashblock)
    echo "Result: $result"

    # The expected format based on your output
    expected="(opt \"$HASHBLOCK\")"
    if [[ "$result" == "$expected" ]]; then
        echo -e "${GREEN}Test PASSED: get_current_hashblock returned the expected hashblock.${NC}"
    else
        echo -e "${RED}Test FAILED: get_current_hashblock did not return the expected hashblock.${NC}"
        all_tests_passed=false
    fi
}

# Function to test appending a hashblock to the stable storage
function test_append_current_hashblock_to_stable {
    echo "Testing append_current_hashblock_to_stable..."
    # Set a hashblock first
    dfx canister call $CANISTER_ID set_hashblock "\"$HASHBLOCK\""
    # Then append it
    result=$(dfx canister call $CANISTER_ID append_current_hashblock_to_stable)
    echo "Result: $result"

    # Check if append was successful
    expected='(opt "Hashblock appended successfully")'
    if [[ "$result" == "$expected" ]]; then
        echo -e "${GREEN}Test PASSED: Hashblock appended successfully.${NC}"
    else
        echo -e "${RED}Test FAILED: Hashblock was not appended as expected.${NC}"
        all_tests_passed=false
    fi
}

test_set_hashblock
test_get_current_hashblock
test_append_current_hashblock_to_stable

if [[ "$all_tests_passed" == true ]]; then
    echo -e "${BLUE}All tests PASSED! We gucci.${NC}"
else
    echo -e "${RED}Some tests FAILED. Check the logs above for more details.${NC}"
fi
