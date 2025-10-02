import axios from "axios";

// in production there is no base url so this code makes it dynamic
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" :"/api"

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("➡️ [API] Attaching token:", token ? token.slice(0,8) + "..." : null);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

