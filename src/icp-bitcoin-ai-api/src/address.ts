import { float64, ic, int, jsonParse, jsonStringify, None, Principal, query, Record, Some, StableBTreeMap, text, TimerId, update, Vec } from "azle";
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

const Address = Record({
  address: text,
  chain_stats: Record({
    funded_txo_count: float64,
    funded_txo_sum: float64,
    spent_txo_count: float64,
    spent_txo_sum: float64,
    tx_count: float64,
  }),
  mempool_stats: Record({
    funded_txo_count: float64,
    funded_txo_sum: float64,
    spent_txo_count: float64,
    spent_txo_sum: float64,
    tx_count: float64,
  })
});
type Address = typeof Address.tsType;
let addressMap = StableBTreeMap<string, Address>(3);

const Whale = Record({
  address: text,
  name: text
})

type Whale = typeof Whale.tsType;
let whalesMap = StableBTreeMap<string, Whale>(2);

export const address = {
  getAddress: update([text], text, async (address: string) => {
    if (!addressMap.containsKey(address)) {
      const response = await ic.call(managementCanister.http_request, {
        args: [
          {
            url: `https://api.mempool.space/api/address/${address}`,
            ...defaultArgs,
            max_response_bytes: Some(1_000n),
          },
        ],
        cycles: 70_402_800n,
      });

      const data: any = Buffer.from(response.body).toString()
      const json: Address = jsonParse(data)
      addressMap.insert(json.address, json)

      return data
    }

    return jsonStringify(addressMap.get(address).Some!)
  }),
  setWhales: update([text, text], text, async (address: string, name: string) => {
    if (!address || !name) {
      return "You have to pass a Address and a Name"
    }

    whalesMap.insert(address, {
      address,
      name
    })

    return jsonStringify(whalesMap.values())
  }),
  setDefaultWhales: update([], text, async () => {

    const data = defaultWhales()

    data.map((whale) => {
      whalesMap.insert(whale.address, {
        address: whale.address,
        name: whale.name
      },)
    })

    return jsonStringify(whalesMap.values())
  }),
  removeWhale: update([text], text, (address) => {
    if (!whalesMap.containsKey(address)) {
      return `${address} not found in Whale List`
    }

    whalesMap.remove(address)

    return `${address} has removed from Whale List`
  }),
  clearWhales: update([], text, () => {
    let whales = whalesMap.keys()

    whales.forEach((id) => {
      whalesMap.remove(id)
    })

    return 'All whales have been removed'
  }),
  getWhaleList: query([], Vec(Whale), () => {
    return whalesMap.values();
  }),
  getWhaleListLength: query([], int, () => {
    return whalesMap.len()
  }),
}

function defaultWhales() {
  return [
    {
      address: "bc1qq0l4jgg9rcm3puhhfwaz4c9t8hdee8hfz6738z",
      name: "Germany Bitcoin Address"
    },
    {
      address: "1FfmbHfnpaZjKFvyi1okTjJJusN455paPH",
      name: "FBI Bitcoin Address"
    },
    {
      address: "34xp4vRoCGJym3xR7yCVPFHoCNxv4Twseo",
      name: "Binance Bitcoin Address"
    },
    {
      address: "bc1qgdjqv0av3q56jvd82tkdjpy7gdp9ut8tlqmgrpmv24sq90ecnvqqjwvw97",
      name: "Bitfinex Bitcoin Address"
    },
    {
      address: "3M219KR5vEneNb47ewrPfWyb5jQ2DjxRP6",
      name: "Binance Bitcoin Address"
    },
    {
      address: "3HcEUguUZ4vyyMAPWDPUDjLqz882jXwMfV",
      name: "Kraken Bitcoin Address"
    },
  ]
}