import FormSingIn from "./FormSingIn";

const SingInComponent = () => {
  return (
    <section className="h-full lg:h-auto">
      <figure className="flex flex-col gap-5 ">
        <h2 className="mb-3 text-5xl text-center font-poiret text-rose-300">
          estetica.<span className="text-sm">App</span>
        </h2>
        <p className="text-xl text-center font-poiret text-rose-300">
          A arte de encantar olhares, revelando o melhor de você
        </p>
        <FormSingIn />
      </figure>
    </section>
  );
};

export default SingInComponent;
