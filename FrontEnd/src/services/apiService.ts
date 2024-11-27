import axios from "axios";

const API_URL = "http://localhost:3000";

// Interfaces
export interface Response {
  token?: string;
  user?: { id: number; name: string; email: string };
  error?: boolean;
  message?: string;
}

const handleAxiosError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Erro no servidor.";
  }
  return "Erro inesperado.";
};

const getAuthHeaders = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Endpoints
const endpoints = {
  createUser: "/createUser",
  login: "/login",
  createPost: "/createPost",
  userInfo: "/userInfo",
};

// Funções
export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`${API_URL}${endpoints.createUser}`, userData);
    return res.data;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Erro ao criar usuário:", message);
    throw new Error(message);
  }
};

export const login = async (loginData: {
  email: string;
  password: string;
}): Promise<Response> => {
  try {
    const response = await axios.post(
      `${API_URL}${endpoints.login}`,
      loginData
    );
    return response.data;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Erro ao fazer login:", message);
    throw new Error(message);
  }
};

export const createPost = async (postData: {
  content: string;
  title: string;
  userId: number;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}${endpoints.createPost}`,
      postData
    );
    return response.data;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Erro ao criar post:", message);
    throw new Error(message);
  }
};

export const fetchUserData = async (token: string): Promise<Response> => {
  try {
    const response = await axios.get(
      `${API_URL}${endpoints.userInfo}`,
      getAuthHeaders(token)
    );
    return response.data;
  } catch (error) {
    const message = handleAxiosError(error);
    console.error("Erro ao buscar dados do usuário:", message);
    throw new Error(message);
  }
};
