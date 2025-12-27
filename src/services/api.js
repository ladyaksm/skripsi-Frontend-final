import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL
// const API_BASE_URL = "http://127.0.0.1:5003"

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "ngrok-skip-browser-warning": "true"
  }
});


// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default apiClient