import { createContext, useState, ReactNode } from "react";
import api from "../services/apiService";

// Defina os tipos para o contexto
interface Usuario {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}

interface Empresa {
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
}

interface CadastroContextType {
  usuario: Usuario;
  empresa: Empresa;
  atualizarUsuario: (campo: keyof Usuario, valor: string) => void;
  atualizarEmpresa: (campo: keyof Empresa, valor: string) => void;
  cadastrar: () => void;
}

// Estado inicial
const usuarioInicial: Usuario = {
  nome: "",
  email: "",
  cpf: "",
  senha: "",
};

const empresaInicial: Empresa = {
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
};

// Criação do contexto
export const CadastroContext = createContext<CadastroContextType | null>(null);

export const CadastroProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario>(usuarioInicial);
  const [empresa, setEmpresa] = useState<Empresa>(empresaInicial);

  const atualizarUsuario = (campo: keyof Usuario, valor: string) => {
    setUsuario((prev) => ({ ...prev, [campo]: valor }));
  };

  const atualizarEmpresa = (campo: keyof Empresa, valor: string) => {
    setEmpresa((prev) => ({ ...prev, [campo]: valor }));
  };

  const cadastrar = async () => {
    const dados = { usuario, empresa };
    console.log("Enviando dados para o backend:", dados);

    // Simulação de envio de dados para o backend
    try {
      const response = await fetch(`${api}/cadastrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
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
