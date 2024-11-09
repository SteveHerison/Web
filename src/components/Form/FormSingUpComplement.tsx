// FormSignIn.tsx
import { useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";

const FormSingUpComplement = () => {
  const [disable, setDisable] = useState(false);
  const [inputFormName, setInputFormName] = useState("");
  const [inputFormEmail, setInputFormEmail] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [passwordConfirmError, setPasswordConfirmError] = useState("");

  const handleFocus = (field: string) => {
    if (field === "name") setNameError("");
    if (field === "email") setEmailError("");

    if (field === "passwordConfirm") setPasswordConfirmError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNameError("");
    setEmailError("");

    let errorMessage = false;

    if (!inputFormName) {
      setNameError("Nome é obrigatório.");
      errorMessage = true;
    }
    if (!inputFormEmail) {
      setEmailError("E-mail é obrigatório.");
      errorMessage = true;
    }

    if (!passwordConfirmError) {
      setPasswordConfirmError("Senha é obrigatória.");
      errorMessage = true;
    }

    if (errorMessage) return;
    setError("Erro ao realizar login. Tente novamente.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {error && <p className="mb-5 text-center text-red-500">{error}</p>}
      <div className="flex flex-col gap-4 my-5 space-y-3">
        <InputForm
          title="Nome"
          id="nome"
          place=""
          type="text"
          disabled={disable}
          value={inputFormName}
          onChange={setInputFormName}
          spellcheck={true}
          onFocus={() => handleFocus("name")}
          errorMessage={nameError}
        />
        <InputForm
          title="E-mail"
          id="email"
          place=""
          type="email"
          disabled={disable}
          value={inputFormEmail}
          onChange={setInputFormEmail}
          spellcheck={true}
          onFocus={() => handleFocus("email")}
          errorMessage={emailError}
        />
      </div>
      <label htmlFor="terms" className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 p-2 my-5 outline-none"
        />
        Aceito todas as
      </label>
      <div className="px-10">
        <Button title="Entrar" type="submit" />
      </div>
    </form>
  );
};

export default FormSingUpComplement;
