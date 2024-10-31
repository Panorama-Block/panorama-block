import data from './data.json'
import axios from 'axios';

const BASE_URL = "http://localhost:3000/api"

const StacksService = {
  getBalances: async (address: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/${address}/balances`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getAssets: async (address: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/${address}/assets`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getStxInbound: async (address: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/${address}/stx_inbound`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getStx: async (address: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/accounts/${address}/stx`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getBlocks: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blocks`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getBlocksHash: async (hash: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/blocks/${hash}`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getBlocksAverageTime: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blocks/average-times`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getNfts: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tokens/nft/mints`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getHoldersById: async (contractId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/tokens/fungible/${contractId}/holders`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getHoldingsByNft: async (address: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/tokens/nft/${address}/holdings`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getNftHistory: async (contractId: string, tokenId: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/tokens/nft/${contractId}/history/${tokenId}`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getHoldersByToken: async (token: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/tokens/ft/${token}/holders`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getNftHoldings: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tokens/nft/holdings`)
      return response
    }
    catch (error) {
      return error
    }
  },
  getNftsHistory: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tokens/nft/history`)
      return response
    }
    catch (error) {
      return error
    }
  },
}

export default StacksService