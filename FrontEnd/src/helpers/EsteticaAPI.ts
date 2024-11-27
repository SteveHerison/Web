import { Response } from "../services/apiService";

export const EsteticaApi = async (
  email: string,
  password: string
): Promise<Response> => {
  if (email === "user@example.com" && password === "password") {
    return {
      token: "seu-token-aqui",
      user: {
        id: 1,
        name: "Nome do Usuário",
        email: "user@example.com",
      },
      error: false,
    };
  } else {
    return {
      error: true,
      message: "Credenciais inválidas",
    };
  }
};
