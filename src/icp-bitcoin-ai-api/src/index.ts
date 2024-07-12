import { Canister, query } from 'azle';
import { HttpResponse, HttpTransformArgs } from 'azle/canisters/management';
import { hashblock } from './hashblock';
import { transaction } from './transaction';

export default Canister({
    ...hashblock,
    ...transaction,
    transform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});