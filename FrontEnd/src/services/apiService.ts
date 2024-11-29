import axios from "axios";

// URL base do backend
const API_URL = process.env.REACT_APP_API_URL;

export async function getFunction() {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
}
