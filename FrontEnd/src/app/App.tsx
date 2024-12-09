import { ModalProvider } from "../contexts/ModalContext";
import MainRouter from "../routers/RouterMain";
import Layout from "./layout";

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
  return <MainRouter />;
};

export default App;
