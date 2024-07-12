import { Canister, query } from 'azle';
import { HttpResponse, HttpTransformArgs } from 'azle/canisters/management';
import { transaction } from './transaction';

export default Canister({
    ...transaction,
    transform: query([HttpTransformArgs], HttpResponse, (args) => {
        return {
            ...args.response,
            headers: []
        };
    })
});