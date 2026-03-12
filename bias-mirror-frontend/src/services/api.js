import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:8000/api",
  timeout: 30000,
});

export const analyzeText = (text) => api.post("/analyze", { text });

export const rewriteText = (text, label) => api.post("/rewrite", { text, label });

export default api;