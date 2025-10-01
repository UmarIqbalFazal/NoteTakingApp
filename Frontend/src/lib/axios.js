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


/* commenting out code for debugging
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api", // ✅ correct port
});

// automatically attach token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

*/

