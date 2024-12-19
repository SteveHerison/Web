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

  // onde o Header e o Footer não devem ser exibidos
  const hideHeaderFooterRoutes = ["/", "/login"];

  // Verifica se a rota atual está na lista de rotas que não devem exibir o Header e o Footer
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(
    location.pathname
  );

  return (
    <div className="flex w-full h-full">
      {!shouldHideHeaderFooter && <Navbar />}

      <div className="flex flex-col w-full h-full">
        {!shouldHideHeaderFooter && <Header />}
        <div className="flex-1 w-full p-2">
          <MainRouter />
        </div>
        {!shouldHideHeaderFooter && <Footer />}
      </div>
    </div>
  );
};

export default App;
