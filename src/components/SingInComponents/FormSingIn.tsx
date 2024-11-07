// FormSignIn.tsx
import { useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";

const FormSignIn = () => {
  const [inputFormEmail, setInputFormEmail] = useState("");
  const [inputFormPassword, setInputFormPassword] = useState("");
  const [disable, setDisable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleFocus = (field: string) => {
    if (field === "email") setEmailError("");
    if (field === "password") setPasswordError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!inputFormEmail) {
      setEmailError("E-mail é obrigatório.");
      hasError = true;
    }

    if (!inputFormPassword) {
      setPasswordError("Senha é obrigatória.");
      hasError = true;
    }

    if (hasError) return;
    setError("Erro ao realizar login. Tente novamente.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col gap-4 my-5 space-y-3">
        <InputForm
          title="E-mail"
          id="email"
          place=""
          type="text"
          disabled={disable}
          value={inputFormEmail}
          onChange={setInputFormEmail}
          spellcheck={true}
          onFocus={() => handleFocus("email")}
          errorMessage=""
        />
        <InputForm
          title="Senha"
          id="password"
          place=""
          type="password"
          disabled={disable}
          value={inputFormPassword}
          onChange={setInputFormPassword}
          spellcheck={true}
          onFocus={() => handleFocus("password")}
          errorMessage=""
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

export default FormSignIn;
