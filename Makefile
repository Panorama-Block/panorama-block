build: deploy setup

deploy:
	dfx deploy

setup:
	dfx canister call mempool setup_transactions "(principal \"`dfx canister id transactions`\")"

test: hashblock

hashblock:
	@./src/icp-bitcoin-ai-rust/hashblock/tests/hashblock_test.sh
