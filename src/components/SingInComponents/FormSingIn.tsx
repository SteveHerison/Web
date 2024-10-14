import { useState } from "react";
import Button from "../ButtonForm";
import Input from "../InputForm";

const FormSingIn = () => {
  const [inputFormEmail, setInputFormEmail] = useState("");
  const [inputFormPassord, setInputFormPassword] = useState("");

  return (
    <form action="" className="flex flex-col ">
      <Input
        title="Email"
        type="email"
        value={inputFormEmail}
        place="exemplo@Email.com"
        onChange={setInputFormEmail}
      />
      <Input
        title="Senha"
        type="password"
        value={inputFormPassord}
        place="Digite sua senha"
        onChange={setInputFormPassword}
      />

      <label htmlFor="" className="flex items-center gap-2">
        <input type="checkbox" className="p-2 my-5 h-4 w-4 outline-none" />
        Aceito todas as
      </label>
      <div className="px-10">
        <Button title="Entrar" value="submit" />
      </div>
    </form>
  );
};

export default FormSingIn;
