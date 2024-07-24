import { ic, None, Principal, Some, text, int, update, jsonStringify, jsonParse, Record, nat, StableBTreeMap, nat8, nat64, float64, query, Vec, Opt, Void, TimerId } from "azle";
import { managementCanister } from "azle/canisters/management";

export const defaultArgs = {
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

let hashblocksMap = StableBTreeMap<string, Hashblocks>(0);

let currentHashblock: text = '';
let remain: int = BigInt(0)
let timer: TimerId = BigInt(0)
let newestTimer: TimerId = BigInt(0)

export const hashblock = {
  oldUpdateHashblocks: update([Opt(text), int], text, async (id: Opt<text>, count: int) => {
    let lastId: string = id.Some?.toString() ?? hashblocksMap.keys().slice(-1)[0]

    if (!lastId) {
      return 'No Hashblocks found'
    }

    for (let i = 0; i < count; i++) {
      const hasHashblock = hashblocksMap.containsKey(lastId)

      if (!hasHashblock) {
        const response = await ic.call(managementCanister.http_request, {
          args: [
            {
              url: `https://api.mempool.space/api/block/${lastId}`,
              ...defaultArgs,
              max_response_bytes: Some(1_500n)
            },
          ],
          cycles: 257_706_800n,
        });

        const data: any = Buffer.from(response.body).toString()
        const json: Hashblocks = jsonParse(data)
        hashblocksMap.insert(lastId, json)
        lastId = json.previousblockhash
      }
      else {
        lastId = hashblocksMap.get(lastId).Some!.previousblockhash
        count++
      }
    }

    return jsonStringify(hashblocksMap.keys())
  }),
  setHashblock: update([text], Void, (id) => {
    currentHashblock = id;
  }),
  updateHashblocks: update([int], text, (count: int) => {
    remain = count

    if (timer) {
      ic.clearTimer(timer)
    }

    if (!currentHashblock) {
      return 'No Hashblocks found'
    }

    hashblockCallback();

    timer = ic.setTimerInterval(BigInt(15), hashblockCallback)

    return `Ok, collecting ${count} hashblocks`
  }),
  updateWithNewestHashblocks: update([], text, () => {
    if (newestTimer) {
      ic.clearTimer(newestTimer)
    }

    newersHashblockCallback()

    newestTimer = ic.setTimerInterval(BigInt(1800), newersHashblockCallback)

    return `Ok, collecting the newest hashblocks`
  }),
  removeHashblocks: update([], text, () => {
    let hashblocks = hashblocksMap.keys()

    hashblocks.forEach((id) => {
      hashblocksMap.remove(id)
    })

    return 'Wiped All Hashblocks'
  }),
  testCycles: update([], text, async () => {
    const response = await ic.call(managementCanister.http_request, {
      args: [
        {
          url: `https://api.mempool.space/api/blocks/`,
          ...defaultArgs,
          max_response_bytes: Some(5000n),
        },
      ],
      cycles: 153_379_200n,
    });
    const data: any = Buffer.from(response.body).toString()
    const json: Hashblocks[] = jsonParse(data)

    json.map((hashblock) => {
      if (!hashblocksMap.containsKey(hashblock.id)) {
        hashblocksMap.insert(hashblock.id, hashblock)
        currentHashblock = hashblock.previousblockhash
      }
      else {
        currentHashblock = hashblock.previousblockhash
      }
    })
    return `Ok, collected ${json.length} hashblocks`
  }),
  resetUpdateTimer: update([], text, () => {
    ic.clearTimer(timer)
    return 'Timer of updateHashblocks has canceled'
  }),
  resetUpdateNewestTimer: update([], text, () => {
    ic.clearTimer(newestTimer)
    return 'Timer of updateWithNewestHashblocks has canceled'
  }),
  getHashblockIds: query([], Vec(text), () => {
    return hashblocksMap.keys();
  }),
  getHashblocks: query([], Vec(Hashblocks), () => {
    const data = hashblocksMap.values()

    if (data) {
      const result = data.sort((a, b) => b.timestamp - a.timestamp)
      return result
    }

    return [];
  }),
  getHashblocksLength: query([], int, () => {
    return hashblocksMap.len()
  }),
  getQueueRemain: query([], int, () => {
    return remain
  })
}

async function hashblockCallback(): Promise<void> {
  if (!currentHashblock) {
    return
  }

  if (!remain) {
    ic.clearTimer(timer)
    return
  }

  while (hashblocksMap.containsKey(currentHashblock)) {
    let previousblockhash = hashblocksMap.get(currentHashblock).Some?.previousblockhash

    if (previousblockhash) {
      currentHashblock = previousblockhash
    }
  }

  const response = await ic.call(
    managementCanister.http_request,
    {
      args: [
        {
          url: `https://api.mempool.space/api/block/${currentHashblock}`,
          ...defaultArgs,
          max_response_bytes: Some(1_500n)
        }
      ],
      cycles: 257_706_800n
    }
  );

  const data: any = Buffer.from(response.body).toString()
  const json: Hashblocks = jsonParse(data)
  hashblocksMap.insert(currentHashblock, json)
  currentHashblock = json.previousblockhash
  if (remain > 0) {
    remain--
  }
}

async function newersHashblockCallback(): Promise<void> {
  const response = await ic.call(managementCanister.http_request, {
    args: [
      {
        url: `https://api.mempool.space/api/blocks/`,
        ...defaultArgs,
        max_response_bytes: Some(5000n),
      },
    ],
    cycles: 153_379_200n,
  });
  const data: any = Buffer.from(response.body).toString()
  const json: Hashblocks[] = jsonParse(data)

  json.map((hashblock) => {
    if (!hashblocksMap.containsKey(hashblock.id)) {
      hashblocksMap.insert(hashblock.id, hashblock)
      currentHashblock = hashblock.previousblockhash
    }
    else {
      currentHashblock = hashblock.previousblockhash
    }
  })
}