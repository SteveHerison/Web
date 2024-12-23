import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import { ModalProvider } from "../contexts/ModalContext";
import MainRouter from "../routers/RouterMain";
import Layout from "./layout";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

const App = () => {
  return (
    <ModalProvider>
      <Layout>
        <Content />
      </Layout>
    </ModalProvider>
  );
};

const Content = () => {
  const location = useLocation();

  const hideHeaderFooterRoutes = ["/", "/login"];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <div
      className={`flex w-full h-full ${
        !shouldHideHeaderFooter ? "overflow-hidden" : "overflow-auto"
      } `}
    >
      {!shouldHideHeaderFooter && <Navbar />}

      <div className="flex flex-col w-full h-full">
        {!shouldHideHeaderFooter && <Header />}
        <div
          className={`flex-1 w-full h-full max-h-screen ${
            !shouldHideHeaderFooter ? "overflow-hidden" : "overflow-auto"
          } `}
        >
          <MainRouter />
        </div>
        {!shouldHideHeaderFooter && <Footer />}
      </div>
    </div>
  );
};

export default App;
