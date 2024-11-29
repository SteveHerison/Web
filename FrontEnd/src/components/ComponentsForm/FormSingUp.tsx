import { useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";
import { useNavigate } from "react-router-dom";

const FormSignUp = () => {
  const [disable] = useState(false);
  const [inputFormName, setInputFormName] = useState("");
  const [inputFormEmail, setInputFormEmail] = useState("");
  const [inputFormPassword, setInputFormPassword] = useState("");
  const [inputFormPasswordConfirm, setInputFormPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const navigate = useNavigate();

  const handleFocus = (field: string) => {
    if (field === "name") setNameError("");
    if (field === "email") setEmailError("");
    if (field === "password") setPasswordError("");
    if (field === "passwordConfirm") setPasswordConfirmError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPasswordConfirmError("");

    let errorMessage = false;

    if (!inputFormName) {
      setNameError("Nome é obrigatório.");
      errorMessage = true;
    }
    if (!inputFormEmail) {
      setEmailError("E-mail é obrigatório.");
      errorMessage = true;
    }
    if (!inputFormPassword) {
      setPasswordError("Senha é obrigatória.");
      errorMessage = true;
    }
    if (!inputFormPasswordConfirm) {
      setPasswordConfirmError("Confirmação de senha é obrigatória.");
      errorMessage = true;
    }

    if (errorMessage) return;

    navigate("/cadastro");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {error && <p className="mb-5 text-center text-red-500">{error}</p>}
      <div className="flex flex-col gap-4 my-5 space-y-3">
        <InputForm
          title="Nome"
          id="nome"
          type="text"
          disabled={disable}
          value={inputFormName}
          onChange={setInputFormName}
          spellcheck={true}
          onFocus={() => handleFocus("name")}
          errorMessage={nameError}
          place=""
        />
        <InputForm
          title="E-mail"
          id="email"
          type="email"
          disabled={disable}
          value={inputFormEmail}
          onChange={setInputFormEmail}
          spellcheck={true}
          onFocus={() => handleFocus("email")}
          errorMessage={emailError}
          place=""
        />
        <InputForm
          title="Senha"
          id="password"
          type="password"
          disabled={disable}
          value={inputFormPassword}
          onChange={setInputFormPassword}
          spellcheck={true}
          onFocus={() => handleFocus("password")}
          errorMessage={passwordError}
          place=""
        />
        <InputForm
          title="Confirmação da senha"
          id="passwordConfirm"
          type="password"
          disabled={disable}
          value={inputFormPasswordConfirm}
          onChange={setInputFormPasswordConfirm}
          spellcheck={true}
          onFocus={() => handleFocus("passwordConfirm")}
          errorMessage={passwordConfirmError}
          place=""
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
        <Button title="Avançar" type="submit" />
      </div>
    </form>
  );
};

export default FormSignUp;
