import { createActor } from "../../../../declarations/mempool"
import data from './data.json'

const actor = createActor(import.meta.env.VITE_MEMPOOL_CANISTER_ID);

const IcpService = {
  setblock: async () => {
    try {
      const response = await actor.set_block_hash(
        "000000000000000000031b5866b8a3702b70c44b751be809462a6adc5d490fc7"
      );
      return response
    } catch (error) {
      return error
    }
  },
  getBlockInfo: async () => {
    try {
      const response = await actor.get_bitcoin_block_info()
      return response
    } catch (error) {
      return error
    }
  },
  getHashblocks: async () => {
    try {
      const response = await actor.get_stable_blocks()
      return response
    }
    catch (error) {
      return error
    }
  },
  getHashblocksCached: (count: bigint) => {
    try {
      const response = { ok: data.hashblocks }
      return response
    }
    catch (error) {
      return error
    }
  },
  getAddressInfo: async (address: string) => {
    try {
      const response = await actor.get_address_info(address)
      return response
    }
    catch (error) {
      return error
    }
  },
  getTransactionInfo: async (transaction: string) => {
    try {
      const response = await actor.get_bitcoin_transaction_info(transaction)
      return response
    }
    catch (error) {
      return error
    }
  }
}

export default IcpService