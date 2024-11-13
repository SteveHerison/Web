import FormSingIn from "./FormSingIn";

import { useNavigate } from "react-router-dom";

const SingInComponent = () => {
  const navigate = useNavigate();

  const handleShowLogUp = () => {
    navigate("/");
  };

  return (
    <section>
      <figure className="flex flex-col gap-5 ">
        <h2 className="mb-3 text-6xl text-center font-poiret text-rose-300">
          estetica.<span className="text-sm">App</span>
        </h2>
        <p className="text-xl text-center font-poiret text-rose-300">
          A arte de encantar olhares, revelando o melhor de você
        </p>
        <FormSingIn />
      </figure>
      <p className="my-5 text-center">
        Ainda não possui{" "}
        <span
          className="font-semibold text-red-300 cursor-pointer hover:underline decoration-pink-500"
          onClick={handleShowLogUp}
        >
          cadastro
        </span>
        ?
      </p>
    </section>
  );
};

export default SingInComponent;
