import { createContext, useState } from "react";
import api from "../services/apiService";

interface CadastroContextType {
  usuario: {
    nome: string;
    email: string;
    cpf: string;
    senha: string;
  };
  empresa: {
    razaoSocial: string;
    cnpj: string;
    endereco: string;
    numero: string;
    cep: string;
    cidade: string;
    uf: string;
    telefone: string;
    responsavel: string;
    emailRespo: string;
  };
  atualizarUsuario: (
    campo: "nome" | "email" | "cpf" | "senha",
    valor: string
  ) => void;
  atualizarEmpresa: (
    campo:
      | "razaoSocial"
      | "cnpj"
      | "endereco"
      | "numero"
      | "cep"
      | "cidade"
      | "uf"
      | "telefone"
      | "responsavel"
      | "emailRespo",
    valor: string
  ) => void;
  cadastrar: () => void;
}
const CadastroContext = createContext<CadastroContextType | undefined>(
  undefined
);

export const CadastroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
  });

  const [empresa, setEmpresa] = useState({
    razaoSocial: "",
    cnpj: "",
    endereco: "",
    numero: "",
    cep: "",
    cidade: "",
    uf: "",
    telefone: "",
    responsavel: "",
    emailRespo: "",
  });

  const atualizarUsuario = (
    campo: "nome" | "email" | "cpf" | "senha",
    valor: string
  ) => {
    setUsuario((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const atualizarEmpresa = (
    campo:
      | "razaoSocial"
      | "cnpj"
      | "endereco"
      | "numero"
      | "cep"
      | "cidade"
      | "uf"
      | "telefone"
      | "responsavel"
      | "emailRespo",
    valor: string
  ) => {
    setEmpresa((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const cadastrar = async () => {
    const dados = { usuario, empresa };

    try {
      const response = await fetch(`${api}/createUserAndCompany`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });
      const result = await response.json();
      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert(result.message || "Erro ao cadastrar!");
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
      alert("Erro ao cadastrar!");
    }
  };

  return (
    <CadastroContext.Provider
      value={{
        usuario,
        empresa,
        atualizarUsuario,
        atualizarEmpresa,
        cadastrar,
      }}
    >
      {children}
    </CadastroContext.Provider>
  );
};
