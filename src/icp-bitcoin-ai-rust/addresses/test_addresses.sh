#!/bin/bash

CANISTER_ID="addresses"
TEST_ADDRESS="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Status flag to check if all tests passed
all_tests_passed=true

# Function to test the set_address function
function test_set_address {
    echo "Testing set_address function..."
    result=$(dfx canister call $CANISTER_ID set_address "(\"$TEST_ADDRESS\")")
    echo "Result: $result"

    # Check the result
    if [[ "$result" == "()"* ]]; then
        echo -e "${GREEN}Test PASSED: set_address executed successfully.${NC}"
    else
        echo -e "${RED}Test FAIL: set_address did not return the expected.${NC}"
        all_tests_passed=false
    fi
}

# Function to test the get_current_address function
function test_get_current_address {
    echo "Testing the get_current_address function..."
    result=$(dfx canister call $CANISTER_ID get_current_address)
    echo "Result: $result"

    # The expected format based on your output
    expected="(\"$TEST_ADDRESS\")"
    if [[ "$result" == "$expected" ]]; then
        echo -e "${GREEN}Test PASSED: get_current_address returned the expected address.${NC}"
    else
        echo -e "${RED}Test FAILED: get_current_address did not return the expected address.${NC}"
        all_tests_passed=false
    fi
}

# Function to test appending an address to the stable storage
function test_append_current_address_to_stable {
    echo "Testing append_current_address_to_stable..."
    # Set an address first
    dfx canister call $CANISTER_ID set_address "(\"$TEST_ADDRESS\")"
    # Then append it
    result=$(dfx canister call $CANISTER_ID append_current_address_to_stable)
    echo "Result: $result"

    # Check if append was successful
    expected="(\"Address added to stable\")"
    if [[ "$result" == "$expected" ]]; then
        echo -e "${GREEN}Test PASSED: Address appended successfully.${NC}"
    else
        echo -e "${RED}Test FAILED: Address was not appended as expected.${NC}"
        all_tests_passed=false
    fi
}

# Function to test retrieving an address from stable storage by key
function test_get_stable_address_by_key {
    echo "Testing get_stable_address_by_key..."
    # Retrieve the address
    result=$(dfx canister call $CANISTER_ID get_stable_address_by_key "(\"$TEST_ADDRESS\")")
    echo "Result: $result"

    # Check if the response is not null
    if [[ "$result" != "(null)" ]]; then
        echo -e "${GREEN}Test PASSED: Retrieved a valid address.${NC}"
    else
        echo -e "${RED}Test FAILED: Retrieved address is null, expected a valid address.${NC}"
        all_tests_passed=false
    fi
}

# Function to test listing all addresses
function test_list_addresses {
    echo "Testing list_addresses..."
    result=$(dfx canister call $CANISTER_ID get_stable_addresses)
    echo "Result: $result"

    # Check if the response contains the test address
    if [[ "$result" == *"$TEST_ADDRESS"* ]]; then
        echo -e "${GREEN}Test PASSED: list_addresses returned the expected addresses.${NC}"
    else
        echo -e "${RED}Test FAILED: list_addresses did not return the expected addresses.${NC}"
        all_tests_passed=false
    fi
}

# Function to test deleting all addresses
function test_delete_addresses {
    echo "Testing delete_addresses..."
    result=$(dfx canister call $CANISTER_ID delete_stable_addresses)
    echo "Result: $result"

    # Check if delete was successful
    expected="(\"Stable addresses were clear\")"
    if [[ "$result" == "$expected" ]]; then
        echo -e "${GREEN}Test PASSED: Addresses deleted successfully.${NC}"
    else
        echo -e "${RED}Test FAILED: Addresses were not deleted as expected.${NC}"
        all_tests_passed=false
    fi
}

test_set_address
test_get_current_address
test_append_current_address_to_stable
test_get_stable_address_by_key
test_list_addresses
test_delete_addresses

if [[ "$all_tests_passed" == true ]]; then
    echo -e "${BLUE}All tests PASSED! We gucci.${NC}"
else
    echo -e "${RED}Some tests FAILED. Check the logs above for more details.${NC}"
fi