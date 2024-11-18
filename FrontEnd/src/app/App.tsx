import MainRouter from "../routers/RouterMain";
import Layout from "./layout";

const App = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

const Content = () => {
  return <MainRouter />;
};

export default App;
