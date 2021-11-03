import axios from 'axios'
import { DOMAIN } from '@src/constant'

const instance = axios.create({
  baseURL: DOMAIN,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// Response interceptor
instance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
)

export default instance
