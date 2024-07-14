import { ic, None, Principal, Some, text, update } from "azle";
import { managementCanister } from "azle/canisters/management";

const defaultArgs = {
  max_response_bytes: Some(2_000n),
  method: {
    get: null
  },
  headers: [],
  body: None,
  transform: Some({
    function: [ic.id(), 'transform'] as [
      Principal,
      string
    ],
    context: Uint8Array.from([])
  })
}

export const transaction = {
  getTransaction: update([text], text, async (id: string) => {
    const response = await ic.call(
      managementCanister.http_request,
      {
        args: [
          {
            url: `https://api.mempool.space/api/tx/${id}`,
            ...defaultArgs,
            max_response_bytes: Some(10_000n)
          }
        ],
        cycles: 50_000_000n
      }
    );
    return Buffer.from(response.body).toString()
  }),
  getTransactions: update([text], text, async (id: string) => {
    const response = await ic.call(
      managementCanister.http_request,
      {
        args: [
          {
            url: `https://api.mempool.space/api/block/${id}/txids`,
            ...defaultArgs,
            max_response_bytes: Some(500_000n)
          }
        ],
        cycles: 403_106_000n
      }
    );
    return Buffer.from(response.body).toString()
  }),
}