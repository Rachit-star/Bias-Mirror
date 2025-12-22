import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000/api",
  timeout: 20000, //timeout so that requests don't hang indefinitely
});

export default api;
