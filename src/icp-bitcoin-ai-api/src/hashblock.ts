import { ic, None, Principal, Some, text, int, update, jsonStringify, jsonParse } from "azle";
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

export const hashblock = {
  getHashblocks: update([text, int], text, async (id: string, count: int) => {
    let lastId: string = id
    const hashblocks = []

    for (let i = 0; i < count; i++) {
      const response = await ic.call(
        managementCanister.http_request,
        {
          args: [
            {
              url: `https://api.mempool.space/api/block/${lastId}`,
              ...defaultArgs
            }
          ],
          cycles: 50_000_000n
        }
      );

      const data: any = Buffer.from(response.body).toString()
      hashblocks.push(data)
      lastId = jsonParse(data).previousblockhash
    }

    return JSON.stringify(hashblocks)
  })
}