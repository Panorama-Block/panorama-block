import axios from "axios"

const BASE_URL = import.meta.env.VITE_X_SERVICE_URL

const XService = {
  getTweets: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tweets`)
      return response.data
    }
    catch (error) {
      return error
    }
  }
}

export default XService