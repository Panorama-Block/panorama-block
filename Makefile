# default target
.PHONY: all
build: deploy setup

# deploy all canisters
.PHONY: deploy
deploy:
	@dfx deploy
	@$(MAKE) setup_hashblock

# Deploy a specific canister - never use this
.PHONY: deploy_canister
deploy_canister:
	@dfx deploy $(CANISTER)

# Deploy backend canisters (core and hashblock)
.PHONY: deploy_backend
deploy_backend:
	@$(MAKE) deploy_canister CANISTER=core
	@$(MAKE) deploy_canister CANISTER=hashblock

# Setup function to call set_hashblock_canister after deploying the core
.PHONY: setup_hashblock
setup_hashblock:
	dfx canister call core set_hashblock_canister "(principal \"`dfx canister id hashblock`\")"

# Run all tests
.PHONY: test
test: hashblock_test

# Run hashblock specific tests
.PHONY: hashblock_test
hashblock_test:
	@./src/icp-bitcoin-ai-rust/hashblock/tests/hashblock_test.sh
