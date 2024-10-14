import Logo from "../../assets/logo.png";
import SingInComponent from "../../components/SingInComponents";

const SingIn = () => {
  return (
    <div className="min-h-full lg:h-full w-full flex flex-col lg:flex-row justify-between lg:justify-center lg:items-start  overflow-x-hidden ">
      <div className="h-full  w-1/2 ">
        <img src={Logo} alt="" className="h-full object-cover" />
      </div>

      <div className="lg:w-1/2 flex-1 w-full h-full flex lg:justify-start justify-center items-center p-5">
        <SingInComponent />
      </div>
    </div>
  );
};

export default SingIn;
