import {
  ic,
  int,
  jsonParse,
  jsonStringify,
  None,
  Principal,
  query,
  Record,
  Some,
  StableBTreeMap,
  text,
  TimerId,
  update,
  Vec,
  float64,
} from "azle";
import { managementCanister } from "azle/canisters/management";

// Configuração dos argumentos padrão para requisições HTTP
const defaultArgs = {
  method: {
    get: null,
  },
  headers: [],
  body: None,
  transform: Some({
    function: [ic.id(), "transform"] as [Principal, string],
    context: Uint8Array.from([]),
  }),
};

const HistoricalPrice = Record({
  time: int,
  EUR: float64,
  USD: float64,
});
type HistoricalPrice = typeof HistoricalPrice.tsType;

const CurrentPrice = Record({
  time: int,
  USD: float64,
  EUR: float64,
  GBP: float64,
  CAD: float64,
  CHF: float64,
  AUD: float64,
  JPY: float64,
});
type CurrentPrice = typeof CurrentPrice.tsType;

// Mapa estável para armazenar os preços históricos
let historicalPricesMap = StableBTreeMap<string, HistoricalPrice[]>(4);
// Mapa estável para armazenar os preços atuais
let currentPricesMap = StableBTreeMap<string, CurrentPrice[]>(5);

// Variáveis para timers
let dailyTimer: TimerId = BigInt(0);
let weeklyTimer: TimerId = BigInt(0);
let currentPriceTimer: TimerId = BigInt(0);

export const conversionPrice = {
  getHistoricalPrice: update([text, int], Vec(HistoricalPrice),async (currency: string, timestamp: int) => {
      if (historicalPricesMap.containsKey(currency)) {
        return historicalPricesMap.get(currency).Some ?? [];
      }

      const response = await ic.call(managementCanister.http_request, {
        args: [
          {
            url: `https://mempool.space/api/v1/historical-price?currency=${currency}&timestamp=${timestamp}`,
            ...defaultArgs,
            max_response_bytes: Some(5_000n),
          },
        ],
        cycles: 5_000_000n,
      });

      if (response.status !== 200n) {
        throw new Error(`Failed to fetch historical price for ${currency}`);
      }

      const data: any = Buffer.from(response.body).toString();
      const json: { prices: HistoricalPrice[] } = jsonParse(data);

      // Adicionando log para verificar a estrutura dos dados
      ic.print(`Fetched data: ${jsonStringify(json)}`);

      if (!json.prices || json.prices.length === 0) {
        throw new Error(`No prices data found for ${currency}`);
      }

      historicalPricesMap.insert(currency, json.prices);
      return json.prices;
    }
  ),

  getCurrentPrice: update([], CurrentPrice, async () => {
    const response = await ic.call(managementCanister.http_request, {
      args: [
        {
          url: `https://mempool.space/api/v1/prices`,
          ...defaultArgs,
          max_response_bytes: Some(2_000n),
        },
      ],
      cycles: 5_000_000n,
    });

    if (response.status !== 200n) {
      throw new Error("Failed to fetch current price");
    }

    const data: any = Buffer.from(response.body).toString();
    const json: CurrentPrice = jsonParse(data);

    let prices = currentPricesMap.get("currentPrice").Some ?? [];
    prices.push(json);
    currentPricesMap.insert("currentPrice", prices);
    return json;
  }),

  getStoredHistoricalPrices: query(
    [text],
    Vec(HistoricalPrice),
    (currency: string) => {
      return historicalPricesMap.get(currency).Some ?? [];
    }
  ),

  getStoredCurrentPrice: query([], Vec(CurrentPrice), () => {
    return currentPricesMap.get("currentPrice").Some ?? [];
  }),

  clearHistoricalPrices: update([], text, () => {
    let currencies = historicalPricesMap.keys();

    currencies.forEach((currency) => {
      historicalPricesMap.remove(currency);
    });

    return "All historical prices have been removed";
  }),

  clearCurrentPrice: update([], text, () => {
    currentPricesMap.remove("currentPrice");

    return "Current price has been removed";
  }),

  startTimers: update([], text, () => {
    if (dailyTimer) {
      ic.clearTimer(dailyTimer);
    }
    if (weeklyTimer) {
      ic.clearTimer(weeklyTimer);
    }
    if (currentPriceTimer) {
      ic.clearTimer(currentPriceTimer);
    }

    dailyTimer = ic.setTimerInterval(BigInt(86400), dailyCallback);
    weeklyTimer = ic.setTimerInterval(BigInt(604800), weeklyCallback);
    currentPriceTimer = ic.setTimerInterval(BigInt(300), currentPriceCallback); // 5 minutos

    return "Timers started for daily, weekly, and current price tasks";
  }),

  calculateDailyAverage: query([], text, () => {
    return calculateAverage(1);
  }),

  calculateWeeklyAverage: query([], text, () => {
    return calculateAverage(7);
  }),

  resetDailyData: update([], text, () => {
    let currencies = historicalPricesMap.keys();

    currencies.forEach((currency) => {
      historicalPricesMap.remove(currency);
    });

    return "Daily data has been reset";
  }),
};

async function dailyCallback(): Promise<void> {
  await calculateAverage(1);
  let currencies = historicalPricesMap.keys();

  currencies.forEach((currency) => {
    historicalPricesMap.remove(currency);
  });
}

async function weeklyCallback(): Promise<void> {
  await calculateAverage(7);
}

async function currentPriceCallback(): Promise<void> {
  const response = await ic.call(managementCanister.http_request, {
    args: [
      {
        url: `https://mempool.space/api/v1/prices`,
        ...defaultArgs,
        max_response_bytes: Some(2_000n),
      },
    ],
    cycles: 50_000_000n,
  });

  if (response.status !== 200n) {
    throw new Error("Failed to fetch current price");
  }

  const data: any = Buffer.from(response.body).toString();
  const json: CurrentPrice = jsonParse(data);

  let prices = currentPricesMap.get("currentPrice").Some ?? [];
  prices.push(json);
  currentPricesMap.insert("currentPrice", prices);
}

async function calculateAverage(days: number): Promise<string> {
  let result: { [currency: string]: { EUR: number; USD: number } } = {};
  let count = days * 24; // Assuming 24 data points per day

  historicalPricesMap.keys().forEach((currency) => {
    let prices = historicalPricesMap.get(currency).Some ?? [];
    let sumEUR = 0;
    let sumUSD = 0;

    for (let i = 0; i < Math.min(count, prices.length); i++) {
      sumEUR += prices[i].EUR;
      sumUSD += prices[i].USD;
    }

    result[currency] = {
      EUR: sumEUR / Math.min(count, prices.length),
      USD: sumUSD / Math.min(count, prices.length),
    };
  });

  return jsonStringify(result);
}

