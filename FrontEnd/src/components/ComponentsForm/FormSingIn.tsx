// FormSignIn.tsx
import { useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";
import { EsteticaApi } from "../../helpers/EsteticaAPI";
import { doLogin } from "../../helpers/AuthHandle";

const FormSignIn = () => {
  const [inputFormEmail, setInputFormEmail] = useState("");
  const [inputFormPassword, setInputFormPassword] = useState("");
  const [disable] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleFocus = (field: string) => {
    if (field === "email") setEmailError("");
    if (field === "password") setPasswordError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEmailError("");
    setPasswordError("");

    if (!inputFormEmail || !inputFormPassword) {
      setEmailError(!inputFormEmail ? "O campo de e-mail é obrigatório." : "");
      setPasswordError(
        !inputFormPassword ? "O campo de senha é obrigatório." : ""
      );
      return;
    }

    try {
      const json = await EsteticaApi(inputFormEmail, inputFormPassword);

      if (json.error) {
        setError(json.message || "Erro desconhecido.");
      } else {
        doLogin(json.token!, rememberPassword);
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err); // Para depuração
      setError("Erro ao tentar fazer login. Tente novamente."); // Corrigido para string
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {error && <p className="mb-5 text-center text-red-500">{error}</p>}
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
          errorMessage={emailError}
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
          errorMessage={passwordError}
        />
      </div>
      <label htmlFor="terms" className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4 p-2 my-5 outline-none"
          checked={rememberPassword}
          onChange={() => setRememberPassword(!rememberPassword)}
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
