import { ic, int, jsonParse, jsonStringify, None, Principal, query, Record, Some, StableBTreeMap, text, TimerId, update, Vec } from "azle";
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

const HashblockTransactionsIDs = Vec(text);
export type HashblockTransactionsIDs = typeof HashblockTransactionsIDs.tsType;

export let hashblockTransactionsIDsMap = StableBTreeMap<string, HashblockTransactionsIDs>(1);

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
        cycles: 11_078_400n
      }
    );
    return Buffer.from(response.body).toString()
  }),
  getTransactions: update([text], text, async (id: string) => {
    let hashblockIds = []

    if (!hashblockTransactionsIDsMap || !hashblockTransactionsIDsMap.containsKey(id)) {
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

      const data: any = Buffer.from(response.body).toString()
      const json: HashblockTransactionsIDs = jsonParse(data)
      hashblockTransactionsIDsMap.insert(id, json)
      hashblockIds = json
      return Buffer.from(response.body).toString()
    }
    else {
      hashblockIds = hashblockTransactionsIDsMap.get(id).Some ?? []
    }

    return jsonStringify(hashblockIds)
  }),
  getHashblocksWithTransactions: query([], Vec(HashblockTransactionsIDs), () => {
    return hashblockTransactionsIDsMap.values();
  }),
  getHashblocksWithTransactionsLength: query([], int, () => {
    return hashblockTransactionsIDsMap.len()
  }),
  clearHashblocksTransactions: update([], text, () => {
    let hashblockIds = hashblockTransactionsIDsMap.keys()

    hashblockIds.forEach((id) => {
      hashblockTransactionsIDsMap.remove(id)
    })

    return 'All Transactions IDs have been removed'
  }),
}

// async function transactionsCallback() {
//   const response = await ic.call(
//     managementCanister.http_request,
//     {
//       args: [
//         {
//           url: `https://api.mempool.space/api/block/${id}/txids`,
//           ...defaultArgs,
//           max_response_bytes: Some(500_000n)
//         }
//       ],
//       cycles: 403_106_000n
//     }
//   );
//   return Buffer.from(response.body).toString()
// }