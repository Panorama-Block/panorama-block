import axios from "axios"

const BASE_URL = import.meta.env.VITE_X_SERVICE_URL

const XService = {
  getTweets: async (page: number = 1, limit: number = 20) => {
    try {
      const response = await axios.get(`${BASE_URL}/tweets`, {
        params: {
          page,
          limit
        }
      })
      return response.data
    }
    catch (error) {
      return error
    }
  },
  getZicoTweets: async (page: number = 1, limit: number = 20) => {
    try {
      const response = await axios.get(`${BASE_URL}/tweets/zico`, {
        params: {
          page,
          limit
        }
      })
      return response.data
    }
    catch (error) {
      return error
    }
  }
}

export default XService