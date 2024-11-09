import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SingInComponent from "../Form";
import SingUpComponent from "../Form/singUpComponent";
import Logo from "../../assets/logo.png";
import ProgressBar from "../ProgressBar";

// Defina o tipo das props
type AuthPageProps = {
  initialForm?: string; // Adicione a propriedade `initialForm` como opcional
};

const AuthPage: React.FC<AuthPageProps> = ({ initialForm }) => {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const renderForm = () => {
    if (initialForm === "signup" || location.pathname === "/") {
      return <SingUpComponent />;
    } else if (location.pathname === "/login") {
      return <SingInComponent />;
    }
    return null;
  };

  return (
    <section className="flex flex-col items-center justify-center w-full min-h-screen overflow-hidden ">
      <div className="flex flex-col items-center justify-end w-full h-full lg:flex-row">
        <div
          className={`lg:w-1/2 w-full flex items-center justify-center transition-transform duration-1000 ease-in-out transform ${
            showForm
              ? "translate-x-0"
              : "lg:translate-x-[30rem] translate-y-52 lg:translate-y-0"
          } `}
        >
          <img src={Logo} alt="" className="object-cover" />
        </div>

        <div
          className={`lg:w-1/2 flex-col  px-2 lg:px-0  flex items-center justify-center transition-transform duration-1000 ease-in-out transform ${
            showForm
              ? "lg:translate-x-0 lg:w-1/2 w-full"
              : "lg:translate-x-[100rem] translate-y-[100rem] lg:translate-y-0"
          }`}
        >
          {renderForm()}

          {location.pathname === "/" && <ProgressBar />}
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
