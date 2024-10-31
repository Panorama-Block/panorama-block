import data from './data.json'
import { createActor } from '../../../../declarations/icp-bitcoin-ai-api'
import axios from 'axios';

const actor = createActor(import.meta.env.VITE_MEMPOOL_CANISTER_ID);

type Range = {
  start: number
  end: number
}

const IcpService = {
  getHashblocks: async (page: number = 0) => {
    try {
      const response = await actor.getHashblocks(BigInt(page))
      return response
    }
    catch (error) {
      return error
    }
  },
  getHashblocksCached: () => {
    try {
      const response = data.hashblocks
      return response
    }
    catch (error) {
      return error
    }
  },
  getAddressInfo: async (address: string) => {
    try {
      const response = await actor.getAddress(address)
      return response
    }
    catch (error) {
      return error
    }
  },
  getWhales: async () => {
    try {
      const response = await actor.getWhaleList()
      return response
    }
    catch (error) {
      return error
    }
  },
  getTransactionInfo: async (transaction: string) => {
    try {
      const response = await actor.getTransaction(transaction)
      return response
    }
    catch (error) {
      return error
    }
  },
  getMainChain: async (date: Range) => {
    const response = await axios.get(`https://ic-api.internetcomputer.org/api/v3/bitcoin/main-chain-height?end=${date.end}&start=${date.start}&network=mainnet&format=json`)

    let data = []
    if (response.data) {
      data = response.data.bitcoin_main_chain_height.map((item: any) => ({
        timestamp: item[0],
        height: item[1]
      }))
    }
    return data
  },
  getBitcoinTransactions: async (date: Range) => {
    const response = await axios.get(`https://ic-api.internetcomputer.org/api/v3/bitcoin/number-of-utxos?end=${date.end}&start=${date.start}&network=mainnet&format=json`)

    let data = []
    if (response.data) {
      data = response.data.bitcoin_number_of_utxos.map((item: any) => ({
        timestamp: item[0],
        transactions: item[1]
      }))
    }
    return data
  },
  getCyclesRate: async (date: Range) => {
    const response = await axios.get(`https://ic-api.internetcomputer.org/api/v3/metrics/cycle-burn-rate?start=${date.start}&end=${date.end}&format=json`)

    let data = []
    if (response.data) {
      data = response.data.cycle_burn_rate.map((item: any) => ({
        timestamp: item[0],
        cycles: item[1]
      }))
    }
    console.log(data)
    return data
  },
  getQueryTransactions: async (date: Range) => {
    const response = await axios.get(`https://ic-api.internetcomputer.org/api/v3/max-query-transactions-per-sec-till-date?start=${date.start}&end=${date.end}&format=json`)

    let data = []
    if (response.data) {
      data = response.data.max_query_transactions_per_sec.map((item: any) => ({
        timestamp: item[0],
        queryTransactions: item[1]
      }))
    }
    return data
  },
  getBlocksHeight: async (date: Range) => {
    const response = await axios.get(`
https://ic-api.internetcomputer.org/api/v3/metrics/block-height?start=${date.start}&end=${date.end}&step=60`)

    let data = []
    if (response.data) {
      data = response.data.block_height.map((item: any) => ({
        timestamp: item[0],
        blocks: item[1]
      }))
    }
    console.log(data)
    return data
  },
  getStable: async (date: Range) => {
    const response = await axios.get(`https://ic-api.internetcomputer.org/api/v3/bitcoin/stable-memory-size-in-bytes?end=${date.end}&start=${date.start}&network=mainnet&format=json`)

    let data = []
    if (response.data) {
      data = response.data.bitcoin_stable_memory_size_in_bytes.map((item: any) => ({
        timestamp: item[0],
        memory: item[1]
      }))
    }
    return data
  },
  getCanisters: async (date: Range) => {
    const response = await axios.get(`https://ic-api.internetcomputer.org/api/v3/metrics/registered-canisters-count?end=${date.end}&step=7200&start=${date.start}&status=running&format=json`)

    let data = []
    if (response.data) {
      data = response.data.running_canisters.map((item: any) => ({
        timestamp: item[0],
        canisters: Math.floor(item[1])
      }))
    }

    return data
  },
  getDailyStats: async () => {
    const response = await axios.get(`https://ic-api.internetcomputer.org/api/v3/daily-stats?format=json`)

    let data = []
    if (response.data) {
      data = response.data.daily_stats[0]
    }
    return data
  }
}

export default IcpService