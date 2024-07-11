import Types "./TypesCryptoQuant";
import Errors "./Errors";
import ExperimentalCycles "mo:base/ExperimentalCycles";

actor {
    let management_canister_actor : Types.ManagementCanisterActor = actor("aaaaa-aa");

    // Function to get the balance of a Bitcoin address
    public func get_balance(network: Types.Network, address: Text): async Errors.Result<Nat, Text> {
        let network_text = switch (network) {
            case (#Mainnet) "mainnet";
            case (#Testnet) "testnet";
        };

        // Add cycles for the API call
        ExperimentalCycles.add<system>(230_949_972_000);

        // Make the API call to get the balance
        let balance_result = await management_canister_actor.bitcoin_get_balance({
            address = address;
            network = network_text;
            min_confirmations = null;
        });

        // Return the balance or an error
        switch (balance_result) {
            case (#ok(balance)) { return #ok(balance) };
            case (#err(error_message)) { return #err(error_message) };
        }
    };
};