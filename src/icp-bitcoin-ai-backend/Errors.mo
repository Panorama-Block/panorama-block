module Errors {
    public type MempoolError = {
        message : Text;
    };

    public type Result<T, E> = {
        #ok : T;
        #err : E;
    };
}