import axios from "axios";

// URL base do backend
const API_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

export default api;
