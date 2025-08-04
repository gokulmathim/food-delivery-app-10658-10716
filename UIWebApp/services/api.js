import axios from "axios";

/**
 * Provides a single Axios instance for communication with the backend API using an environment variable for the base URL.
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
