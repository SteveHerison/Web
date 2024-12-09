import { useContext, useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";
import { useNavigate } from "react-router-dom";
import { CadastroContext } from "../../contexts/UserCompanyContext";

const FormSignUp = () => {
  const [disable] = useState(false);
  const navigate = useNavigate();
  const context = useContext(CadastroContext);

  if (!context) {
    throw new Error("FormSignUp deve estar dentro de CadastroProvider");
  }

  const { usuario, atualizarUsuario } = context;
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

  const validateForm = (): boolean => {
    let isValid = true;
    const errors = { ...formErrors };

    if (!usuario.nome) {
      errors.nome = "Nome é obrigatório.";
      isValid = false;
    }
    if (!usuario.email) {
      errors.email = "E-mail é obrigatório.";
      isValid = false;
    }
    if (!usuario.cpf) {
      errors.cpf = "Cpf é obrigatório.";
      isValid = false;
    }
    if (!usuario.senha) {
      errors.senha = "Senha é obrigatória.";
      isValid = false;
    }
    if (usuario.confirmSenha !== usuario.senha) {
      errors.confirmSenha = "Confirmação de senha não coincide.";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      navigate("/cadastro");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col" noValidate>
      {formErrors.nome && (
        <p className="mb-5 text-center text-red-500">{formErrors.nome}</p>
      )}
      <div className="flex flex-col gap-4 my-5 space-y-3">
        <InputForm
          title="Nome"
          id="nome"
          type="text"
          place=""
          spellcheck={true}
          disabled={disable}
          value={usuario.nome}
          onChange={(value) => atualizarUsuario("nome", value)}
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
          value={usuario.email}
          onChange={(value) => atualizarUsuario("email", value)}
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
          value={usuario.cpf}
          onChange={(value) => atualizarUsuario("cpf", value)}
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
          value={usuario.senha}
          onChange={(value) => atualizarUsuario("senha", value)}
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
          value={usuario.confirmSenha}
          onChange={(value) => atualizarUsuario("confirmSenha", value)}
          onFocus={() => handleFocus("confirmSenha")}
          errorMessage={formErrors.confirmSenha}
          required
        />
      </div>
      <label htmlFor="terms" className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 p-2 my-5 outline-none"
        />
        Aceito todas as condições
      </label>
      <div className="flex justify-between w-full gap-80">
        <Button title="Avançar" />
      </div>
    </form>
  );
};

export default FormSignUp;
