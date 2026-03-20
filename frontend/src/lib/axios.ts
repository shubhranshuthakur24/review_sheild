import axios, { AxiosInstance } from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL

if (!apiBaseUrl) {
  throw new Error('Missing VITE_API_URL. Set it in frontend/.env (see frontend/.env.example).')
}

const instance: AxiosInstance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

export default instance
