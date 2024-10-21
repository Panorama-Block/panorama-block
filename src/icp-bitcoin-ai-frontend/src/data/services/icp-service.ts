import data from './data.json'
import { createActor } from '../../../../declarations/icp-bitcoin-ai-api'

const actor = createActor(import.meta.env.VITE_MEMPOOL_CANISTER_ID);

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
  }
}

export default IcpService