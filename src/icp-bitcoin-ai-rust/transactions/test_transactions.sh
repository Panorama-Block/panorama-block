#!/bin/bash

# Teste para o canister de transações

# Certifique-se de que o dfx está rodando
dfx start --background

# Implante o canister
dfx deploy transactions

# Variáveis de teste
TEST_TXID="1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"

# Teste: append_transaction_to_stable
echo "Testando append_transaction_to_stable..."
dfx canister call transactions append_transaction_to_stable "($TEST_TXID)"

# Teste: get_transaction
echo "Testando get_transaction..."
dfx canister call transactions get_transaction "($TEST_TXID)"

# Teste: get_stable_transaction
echo "Testando get_stable_transaction..."
dfx canister call transactions get_stable_transaction "($TEST_TXID)"

# Teste: get_all_stable_transactions
echo "Testando get_all_stable_transactions..."
dfx canister call transactions get_all_stable_transactions

# Teste: delete_stable_transaction
echo "Testando delete_stable_transaction..."
dfx canister call transactions delete_stable_transaction "($TEST_TXID)"

# Teste: delete_stable_transactions
echo "Testando delete_stable_transactions..."
dfx canister call transactions delete_stable_transactions

# Pare o dfx
dfx stop

echo "Testes concluídos."