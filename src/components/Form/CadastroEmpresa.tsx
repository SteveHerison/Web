import FormSingUpComplement from "./FormSingUpComplement";

const CadastroUsuario = () => {
  return (
    <section>
      <figure className="flex flex-col gap-5 ">
        <h2 className="mb-3 text-6xl text-center font-poiret text-rose-300">
          estetica.<span className="text-sm">App</span>
        </h2>

        <FormSingUpComplement />
      </figure>
    </section>
  );
};

export default CadastroUsuario;
