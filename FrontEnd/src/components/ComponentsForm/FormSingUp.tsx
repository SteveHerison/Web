import { useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";
import { useUser } from "../../hooks/useUser";
import api from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const FormSignUp = () => {
  const [disable] = useState(false);
  const { usuario, setUsuario, setShowAlert } = useUser();
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    confirmSenha: "",
  });

  const handleFocus = (field: string) => {
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!usuario) return;

    // Validações básicas
    const errors = {
      nome: usuario.nome ? "" : "O nome é obrigatório",
      email: usuario.email?.includes("@") ? "" : "E-mail inválido",
      cpf: usuario.cpf?.length === 11 ? "" : "CPF deve ter 11 dígitos",
      senha:
        usuario.senha?.length >= 6
          ? ""
          : "Senha deve ter pelo menos 6 caracteres",
      confirmSenha:
        usuario.senha === usuario.confirmSenha ? "" : "As senhas não coincidem",
    };
    setFormErrors(errors);

    // Verifica se há erros
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) return;

    try {
      // Envia os dados para o backend
      const response = await api.post("/createUser", {
        nome: usuario.nome,
        email: usuario.email,
        cpf: usuario.cpf,
        senha: usuario.senha,
      });

      console.log("Usuário cadastrado com sucesso:", response.data);

      // Limpa o formulário após o cadastro
      setUsuario({
        nome: "",
        email: "",
        cpf: "",
        senha: "",
        confirmSenha: "",
      });

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      alert(
        `Erro ao cadastrar usuário. Verifique os dados e tente novamente. ${error}`
      );
    }
  };

  return (
    <form className="flex flex-col" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4 my-5 space-y-3">
        <InputForm
          title="Nome"
          id="nome"
          type="text"
          place=""
          spellcheck={true}
          disabled={disable}
          value={usuario.nome || ""}
          onChange={(value) => setUsuario({ ...usuario, nome: value })}
          onFocus={() => handleFocus("nome")}
          errorMessage={formErrors.nome}
          required
        />
        <InputForm
          title="E-mail"
          id="email"
          type="email"
          place=""
          disabled={disable}
          spellcheck={true}
          value={usuario.email || ""}
          onChange={(value) => setUsuario({ ...usuario, email: value })}
          onFocus={() => handleFocus("email")}
          errorMessage={formErrors.email}
          required
        />
        <InputForm
          title="CPF"
          id="cpf"
          type="text"
          place=""
          spellcheck={true}
          disabled={disable}
          value={usuario.cpf || ""}
          onChange={(value) => setUsuario({ ...usuario, cpf: value })}
          onFocus={() => handleFocus("cpf")}
          errorMessage={formErrors.cpf}
          required
        />
        <InputForm
          title="Senha"
          id="senha"
          type="password"
          place=""
          spellcheck={true}
          disabled={disable}
          value={usuario.senha || ""}
          onChange={(value) => setUsuario({ ...usuario, senha: value })}
          onFocus={() => handleFocus("senha")}
          errorMessage={formErrors.senha}
          required
        />
        <InputForm
          title="Confirmação da senha"
          id="confirmSenha"
          type="password"
          place=""
          spellcheck={true}
          disabled={disable}
          value={usuario.confirmSenha || ""}
          onChange={(value) => setUsuario({ ...usuario, confirmSenha: value })}
          onFocus={() => handleFocus("confirmSenha")}
          errorMessage={formErrors.confirmSenha}
          required
        />
      </div>

      <div className="flex justify-between w-full gap-80">
        <Button title="Avançar" />
      </div>
    </form>
  );
};
export default FormSignUp;
