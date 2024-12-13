import { useUser } from "../../hooks/useUser";
import AlerSucess from "../Alerts/AlerSucess";
import FormSignUp from "./FormSingUp";
import { useNavigate } from "react-router-dom";

const SingUpComponent = () => {
  const { showAlert } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <section>
      {showAlert ? (
        <AlerSucess title="Cadastro realizado com sucesso" />
      ) : (
        <figure className="flex flex-col gap-5">
          <h2 className="mb-3 text-6xl text-center font-poiret text-rose-300">
            estetica.<span className="text-sm">App</span>
          </h2>
          <p className="text-xl text-center font-poiret text-rose-300">
            A arte de encantar olhares, revelando o melhor de você
          </p>
          <FormSignUp />
          <p className="my-5 text-center">
            Já possui Cadastro?{" "}
            <span
              className="font-semibold text-red-300 cursor-pointer hover:underline decoration-pink-500"
              onClick={handleLogin}
            >
              Login
            </span>
          </p>
        </figure>
      )}
    </section>
  );
};

export default SingUpComponent;
