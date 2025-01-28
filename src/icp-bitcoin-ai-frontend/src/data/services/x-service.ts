import axios from "axios"

const BASE_URL = "http://localhost:8000"

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