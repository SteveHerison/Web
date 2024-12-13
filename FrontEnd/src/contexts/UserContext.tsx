import React, { createContext, useState } from "react";
import { Usuario } from "../types/userType";
import api from "../services/apiService";

interface Usuarios {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
  confirmSenha: string;
}

interface UserContextType {
  usuario: Usuarios;
  showAlert: boolean;
  setShowAlert: (showAlert: boolean) => void;
  token: string | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
  setUsuario: (usuario: Usuario) => void;
}

const usuarioInicial: Usuarios = {
  nome: "",
  email: "",
  cpf: "",
  senha: "",
  confirmSenha: "",
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuarios>(usuarioInicial);
  const [token, setToken] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const login = (user: Usuarios, token: string) => {
    setUsuario(user);
    setToken(token);
    localStorage.setItem("usuario", JSON.stringify(user));
    localStorage.setItem("token", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    setUsuario(usuarioInicial);
    setToken(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <UserContext.Provider
      value={{
        usuario,
        token,
        showAlert,
        setShowAlert,
        login,
        logout,
        setUsuario,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
