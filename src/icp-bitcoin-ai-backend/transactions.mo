import Types "./types/TypesMempool";
import Errors "./Errors";
import Debug "mo:base/Debug";
import Blob "mo:base/Blob";
import Cycles "mo:base/ExperimentalCycles";
import Text "mo:base/Text";
import Array "mo:base/Array";
import JSON "mo:serde/JSON";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import ExperimentalCycles "mo:base/ExperimentalCycles";

actor {
    var ic: Types.IC = actor("aaaaa-aa");
    var host: Text = "api.mempool.space";
    
    stable var stableTransactions: [(Text, [Text])] = [];
    var transactionMap = HashMap.HashMap<Text, [Text]>(10, Text.equal, Text.hash);

    public query func transform(raw: Types.TransformArgs): async Types.CanisterHttpResponsePayload {
        let transformed: Types.CanisterHttpResponsePayload = {
            status = raw.response.status;
            body = raw.response.body;
            headers = [
                { name = "Content-Security-Policy"; value = "default-src 'self'" },
                { name = "Referrer-Policy"; value = "strict-origin" },
                { name = "Permissions-Policy"; value = "geolocation=(self)" },
                { name = "Strict-Transport-Security"; value = "max-age=63072000" },
                { name = "X-Frame-Options"; value = "DENY" },
                { name = "X-Content-Type-Options"; value = "nosniff" }
            ]
        };
        return transformed;
    };

    var transform_context: Types.TransformContext = {
        function = transform;
        context = Blob.fromArray([]);
    };

    var request_headers = [
        { name = "Host"; value = host # ":443" },
        { name = "User-Agent"; value = "mempool_canister" }
    ];
	
	// Function to test canister connection
	public func ping(block_hash: Text) : async () {
        Debug.print("Received block hash: " # block_hash);
    };


//	public func fetch_transactions(block_hash: Text): async Errors.Result<[?Text], Errors.MempoolError> {
//			 let txids_result = await get_bitcoin_block_transactions(block_hash);
//
//			 switch (txids_result) {
//				 case (#ok(txids)) {
//					 func processTxids(txids: [Text], index: Nat, accum: [?Text]): async [?Text] {
//						 if (index == txids.size()) {
//							 return accum;
//						 } else {
//							 let tx_result = await get_bitcoin_transaction_info(txids[index]);
//							 let processed_result: ?Text = switch (tx_result) {
//								 case (#ok(text)) { text };
//								 case (#err(_)) { null };
//							 };
//							 return await processTxids(txids, index + 1, Array.append(accum, [processed_result]));
//						 };
//					 };
//					 let transactions_details = await processTxids(txids, 0, []);
//					return #ok(transactions_details);
//				 };
//				 case (#err(e)) {
//					 return #err(e);
//				 };
//			 };
//	 };

    public func get_bitcoin_block_transactions(block_hash: Text) : async Errors.Result<Types.Transactions, Errors.MempoolError> {
        if (block_hash == "") {
            return #err({ message = "Block hash not set" });
        };
        let url_txids = "https://api.mempool.space/api/block/" # block_hash # "/txids";

        let http_request_txids : Types.HttpRequestArgs = {
            url = url_txids;
            max_response_bytes = null;
            headers = [];
            body = null;
            method = #get;
            transform = null;
        };

        Cycles.add<system>(1_603_128_000);

        let http_response_txids : Types.HttpResponsePayload = await ic.http_request(http_request_txids);

        let response_body_txids : Blob = Blob.fromArray(http_response_txids.body);
        let decoded_text_txids : Text = switch (Text.decodeUtf8(response_body_txids)) {
            case (null) { "No value returned" };
            case (?y) { y };
        };

        let json_result_txids = JSON.fromText(decoded_text_txids, null);
        let json_blob_txids = switch (json_result_txids) {
            case (#ok(blob)) { blob };
            case (#err(e)) {
                return #err({ message = "Failed to parse JSON: " # e });
            };
        };

        let txids : ?Types.Transactions = from_candid(json_blob_txids);
        switch (txids) {
            case (?t) {
                transactionMap.put(block_hash, t); 
                stableTransactions := Iter.toArray(transactionMap.entries());
                transactionMap := HashMap.fromIter<Text, [Text]>(stableTransactions.vals(), 10, Text.equal, Text.hash);
                for (key in transactionMap.keys()) {
                    let _ = transactionMap.remove(key);
                };
                return #ok(t) 
            };
            case (null) {
                return #err({ message = "Failed to convert JSON to [Text]" });
            };
        };
    };

    // Function to get the stable transactions
    public query func get_stable_transactions(): async Errors.Result<[(Text, [Text])], Errors.MempoolError> {
        return #ok(stableTransactions);
	};

    // Post-upgrade hook
    system func postupgrade() {
        stableTransactions := [];
        Debug.print("Executing postupgrade...");
    };

};
