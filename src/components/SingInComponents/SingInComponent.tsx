import FormSingIn from "./FormSingIn";

const SingInComponent = () => {
  return (
    <section className="h-full lg:h-auto bg-white rounded-xl drop-shadow-lg p-2">
      <figure className="flex flex-col gap-5 ">
        <h2 className="text-center text-5xl font-poiret text-rose-300 mb-3">
          estetica.<span className="text-sm">App</span>
        </h2>
        <p className="text-center text-xl font-poiret  text-rose-300">
          A arte de encantar olhares, revelando o melhor de você
        </p>
        <FormSingIn />
      </figure>
    </section>
  );
};

export default SingInComponent;
