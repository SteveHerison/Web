import FormEmpresa from "./CadastroComplement";

const CadatroEmpresa = ({ showSuccessAlert }) => {
  return (
    <section>
      <figure className="flex flex-col gap-5 pb-3">
        {!showSuccessAlert && (
          <h2 className="mb-3 text-6xl text-center font-poiret text-rose-300">
            estetica.<span className="text-sm">App</span>
          </h2>
        )}
        <FormEmpresa />
      </figure>
    </section>
  );
};

export default CadatroEmpresa;
