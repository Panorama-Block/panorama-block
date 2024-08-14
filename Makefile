# default target
.PHONY: all
build: deploy setup

# deploy all canisters
.PHONY: deploy
deploy:
	dfx deploy

# Deploy a specific canister - never use this
.PHONY: deploy_canister
deploy_canister:
	@dfx deploy $(CANISTER)

# Deploy backend canisters (core and hashblock)
.PHONY: deploy_backend
deploy_backend:
	@$(MAKE) deploy_canister CANISTER=core
	@$(MAKE) deploy_canister CANISTER=hashblock

# Run all tests
.PHONY: test
test: hashblock_test

# Run hashblock specific tests
.PHONY: hashblock_test
hashblock_test:
	@./src/icp-bitcoin-ai-rust/hashblock/tests/hashblock_test.sh
