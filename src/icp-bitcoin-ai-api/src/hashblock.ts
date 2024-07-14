import { ic, None, Principal, Some, text, int, update, jsonStringify, jsonParse, Record, nat, StableBTreeMap, nat8, nat64, float64, query, Vec, Opt } from "azle";
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

const Hashblocks = Record({
  id: text,
  height: float64,
  version: float64,
  timestamp: float64,
  tx_count: float64,
  size: float64,
  weight: float64,
  merkle_root: text,
  previousblockhash: text,
  mediantime: float64,
  nonce: float64,
  bits: float64,
  difficulty: float64
});
type Hashblocks = typeof Hashblocks.tsType;

let hashblocksMap = StableBTreeMap<string, Hashblocks>(2);

export const hashblock = {
  updateHashblocks: update([Opt(text), int], text, async (id: Opt<text>, count: int) => {
    let lastId: string = id.Some?.toString() ?? hashblocksMap.keys().slice(-1)[0]

    if (!lastId) {
      return 'No Hashblocks found'
    }

    for (let i = 0; i < count; i++) {
      const hasHashblock = hashblocksMap.containsKey(lastId)

      if (!hasHashblock) {
        const response = await ic.call(
          managementCanister.http_request,
          {
            args: [
              {
                url: `https://api.mempool.space/api/block/${lastId}`,
                ...defaultArgs
              }
            ],
            cycles: 5_000_000n
          }
        );

        const data: any = Buffer.from(response.body).toString()
        const json: Hashblocks = jsonParse(data)
        hashblocksMap.insert(lastId, json)
        lastId = json.previousblockhash
      }
      else {
        lastId = hashblocksMap.get(lastId).Some!.previousblockhash
      }
    }

    return jsonStringify(hashblocksMap.keys())
  }),
  removeHashblocks: update([], text, () => {
    let hashblocks = hashblocksMap.keys()

    hashblocks.forEach((id) => {
      hashblocksMap.remove(id)
    })

    return 'Wiped All Hashblocks'
  }),
  getHashblockIds: query([], Vec(text), () => {
    return hashblocksMap.keys();
  }),
  getHashblocks: query([], Vec(Hashblocks), () => {
    return hashblocksMap.values();
  }),
}