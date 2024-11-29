import axios from "axios";

// URL base do backend
const API_URL = "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
