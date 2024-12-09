import { createContext, useState, ReactNode } from "react";
import { Usuario } from "../types/userType";
import { Empresa } from "../types/empresatype";

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
  confirmSenha: "",
};

const empresaInicial: Empresa = {
  razaoSocial: "",
  cnpj: "",
  endereco: "",
  numero: "",
  cep: "",
  bairro: "",
  cidade: "",
  uf: "",
  telefone: "",
  responsavel: "",
  emailRespo: "",
};

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

    try {
      const response = await fetch(
        `http://localhost:3000/createUserAndCompany`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dados),
        }
      );

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
