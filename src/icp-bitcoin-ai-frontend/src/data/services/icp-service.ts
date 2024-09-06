import data from './data.json'
import { createActor } from '../../../../declarations/icp-bitcoin-ai-api'
import { AuthClient } from "@dfinity/auth-client";
import { type _SERVICE } from '../../../../declarations/icp-bitcoin-ai-api/icp-bitcoin-ai-api.did'
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '@dfinity/agent/lib/cjs/canisters/management_service';

const actor = createActor(import.meta.env.VITE_MEMPOOL_CANISTER_ID)

const IcpService = {
  auth: async (authClient: AuthClient) => {
      const identity = authClient.getIdentity();
    
      const host = import.meta.env.VITE_HOST ?? undefined;
      const agent = new HttpAgent({ host, identity })
      const actor = createActor(import.meta.env.VITE_MEMPOOL_CANISTER_ID, {
        agent
      });
  },
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
      const response = { ok: data.hashblocks }
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