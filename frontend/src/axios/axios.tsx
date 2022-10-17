import axios from 'axios'

// process.env.REACT_APP_API_URL
const instance = axios.create({
  // baseURL: 'http://localhost:4444'
  baseURL: process.env.REACT_APP_API_URL
  // axios.get('http://localhost:4444/posts') -> axios.get('/posts')
})

// Middleware - With each request -> check if have saved token in localStorage?
instance.interceptors.request.use((config) => {
  if (config.headers === undefined) {
    config.headers = {}
  }

  config.headers.Authorization = window.localStorage.getItem('token')
  // will check if have access to route or not
  return config
})

export default instance
