build: deploy setup

deploy:
	dfx deploy

setup:
	dfx canister call mempool setup_transactions "(principal \"`dfx canister id transactions`\")"
