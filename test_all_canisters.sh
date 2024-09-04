#!/bin/bash

# Inicie o ambiente dfx
dfx start --background

# Verifique se todos os canisters existem e crie-os se necessário
echo "Verificando e criando canisters..."
for canister in hashblock addresses core; do
    if ! dfx canister info $canister &>/dev/null; then
        dfx canister create $canister
    fi
done

# Implante todos os canisters
echo "Implantando canisters..."
dfx deploy

# Obtenha os IDs dos canisters
HASHBLOCK_ID=$(dfx canister id hashblock)
ADDRESSES_ID=$(dfx canister id addresses)
# TRANSACTIONS_ID=$(dfx canister id transactions)

# Configure o canister core com os IDs dos outros canisters
echo "Configurando o canister core..."
dfx canister call core set_hashblock_canister "(principal \"$HASHBLOCK_ID\")"
dfx canister call core set_addresses_canister "(principal \"$ADDRESSES_ID\")"
# dfx canister call core set_transactions_canister "(principal \"$TRANSACTIONS_ID\")"

# Teste as interações
echo "Testando interações..."

# Teste hashblock
TEST_HASHBLOCK="000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
dfx canister call core call_set_hashblock "(\"$TEST_HASHBLOCK\")"
dfx canister call core call_get_hashblock

# Teste addresses
TEST_ADDRESS="1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
dfx canister call core call_create_address "(\"$TEST_ADDRESS\")"
dfx canister call core call_get_address "(\"$TEST_ADDRESS\")"

# Teste transactions
# TEST_TXID="4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b"
# dfx canister call core call_append_transaction_to_stable "(\"$TEST_TXID\")"
# dfx canister call core call_get_transaction "(\"$TEST_TXID\")"

# Pare o ambiente dfx
dfx stop

echo "Testes concluídos."