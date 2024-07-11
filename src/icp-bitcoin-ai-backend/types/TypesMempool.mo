module Types {
    public type Timestamp = Nat64;

    public type HttpRequestArgs = {
        url : Text;
        max_response_bytes : ?Nat64;
        headers : [HttpHeader];
        body : ?[Nat8];
        method : HttpMethod;
        transform : ?TransformRawResponseFunction;
    };

    public type HttpHeader = {
        name : Text;
        value : Text;
    };

    public type HttpMethod = {
        #get;
        #post;
        #head;
    };

    public type HttpResponsePayload = {
        status : Nat;
        headers : [HttpHeader];
        body : [Nat8];
    };

    public type TransformRawResponseFunction = {
        function : shared query TransformArgs -> async HttpResponsePayload;
        context : Blob;
    };

    public type TransformArgs = {
        response : HttpResponsePayload;
        context : Blob;
    };

    public type CanisterHttpResponsePayload = {
        status : Nat;
        headers : [HttpHeader];
        body : [Nat8];
    };

    public type TransformContext = {
        function : shared query TransformArgs -> async HttpResponsePayload;
        context : Blob;
    };

    public type IC = actor {
        http_request : HttpRequestArgs -> async HttpResponsePayload;
    };

    public type BitcoinBlock = {
        id : Text;
        height : Nat;
        version : Nat;
        timestamp : Nat;
        bits : Nat;
        nonce : Nat;
        difficulty : Float;
        merkle_root : Text;
        tx_count : Nat;
        size : Nat;
        weight : Nat;
        previousblockhash : Text;
    };

    // public type TransactionData = {
    //     txid: Text;
    //     version: Nat32;
    //     locktime: Nat32;
    //     vin: [VinData];
    //     vout: [VoutData];
    //     size: Nat;
    //     weight: Nat;
    //     sigops: Nat;
    //     fee: Nat;
    //     status: TransactionStatus;
    // };

    // public type VinData = {
    //     txid: Text;
    //     vout: Nat32;
    //     prevout: ?PrevoutData;
    //     scriptsig: Text;
    //     scriptsig_asm: Text;
    //     is_coinbase: Bool;
    //     sequence: Nat32;
    // };

    // public type PrevoutData = {
    //     scriptpubkey: Text;
    //     scriptpubkey_asm: Text;
    //     scriptpubkey_type: Text;
    //     scriptpubkey_address: Text;
    //     value: Nat;
    // };

    // public type VoutData = {
    //     scriptpubkey: Text;
    //     scriptpubkey_asm: Text;
    //     scriptpubkey_type: Text;
    //     scriptpubkey_address: Text;
    //     value: Nat;
    // };

    // public type TransactionStatus = {
    //     confirmed: Bool;
    //     block_height: Nat;
    //     block_hash: Text;
    //     block_time: Timestamp;
    // };

    public type Transactions = [Text];

    public type ChainStats = {
        funded_txo_count : Nat;
        funded_txo_sum : Nat;
        spent_txo_count : Nat;
        spent_txo_sum : Nat;
        tx_count : Nat;
    };
    public type MempoolStats = {
        funded_txo_count : Nat;
        funded_txo_sum : Nat;
        spent_txo_count : Nat;
        spent_txo_sum : Nat;
        tx_count : Nat;
    };

    public type AddressInfo = {
        address : Text;
        chain_stats : ChainStats;
        mempool_stats : MempoolStats;
    };

    public type BitcoinPrice = {
        time: Nat;
        USD: Nat;
        EUR: Nat;
        GBP: Nat;
        CAD: Nat;
        CHF: Nat;
        AUD: Nat;
        JPY: Nat;
    };

    public type HistoricalPrice = {
        prices: [
            {
                time: Nat;
                EUR: Nat;
                USD: Nat;
            }
        ];
        exchangeRates: {
            USDEUR: Float;
            USDGBP: Float;
            USDCAD: Float;
            USDCHF: Float;
            USDAUD: Float;
            USDJPY: Float;
        };
    };
};
