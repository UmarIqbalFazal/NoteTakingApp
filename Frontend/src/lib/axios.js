import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
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

