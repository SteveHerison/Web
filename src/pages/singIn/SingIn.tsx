import Logo from "../../assets/logo.png";
import SingInComponent from "../../components/SingInComponents";

const SingIn = () => {
  return (
    <div className="flex items-center justify-center w-full h-full p-5 md:p-0">
      <div className="flex flex-col w-full h-full md:items-center md:justify-between md:flex-row">
        <div className="">
          <img src={Logo} alt="" className="object-contain " />
        </div>

        <div className="flex items-center justify-center w-full h-full pb-2">
          <SingInComponent />
        </div>
      </div>
    </div>
  );
};

export default SingIn;
