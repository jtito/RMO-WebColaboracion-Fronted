import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,

  responseType: 'json',
  maxBodyLength: Infinity,

  headers: {
    'Content-Type': 'application/json'
  }
})

export default API
