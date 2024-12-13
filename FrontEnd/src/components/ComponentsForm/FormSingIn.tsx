import { useState } from "react";
import Button from "../ButtonForm";
import InputForm from "../InputForm";
import { useUser } from "../../hooks/useUser";
import api from "../../services/apiService";
import { useNavigate } from "react-router-dom";

const FormSignIn = () => {
  const navigate = useNavigate();
  const [disable] = useState(false);
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState({
    email: "",
    senha: "",
  });

  const handleFocus = (field: string) => {
    setError((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await api.post("/login", { email, senha: password });
      const { token, user } = response.data;

      login(user, token);

      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError((prev) => ({
        ...prev,
        email: "Erro ao fazer login. Verifique suas credenciais.",
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {error.email && (
        <p className="mb-5 text-center text-red-500">{error.email}</p>
      )}

      <div className="flex flex-col gap-4 my-5 space-y-3">
        <InputForm
          title="E-mail"
          id="email"
          type="text"
          disabled={disable}
          value={email}
          onChange={setEmail}
          spellcheck={true}
          onFocus={() => handleFocus("email")}
          errorMessage={error.email}
        />
        <InputForm
          title="Senha"
          id="password"
          type="password"
          disabled={disable}
          value={password}
          onChange={setPassword}
          spellcheck={true}
          onFocus={() => handleFocus("senha")}
          errorMessage={error.senha}
        />
      </div>

      <label htmlFor="terms" className="flex items-center gap-2">
        <input
          type="checkbox"
          id="terms"
          className="w-4 h-4"
          checked={rememberPassword}
          onChange={() => setRememberPassword(!rememberPassword)}
        />
        Lembrar-me
      </label>

      <div className="flex justify-between w-full mt-4 gap-80">
        <Button title="Entrar" />
      </div>
    </form>
  );
};

export default FormSignIn;
