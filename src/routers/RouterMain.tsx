import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import SingIn from "../pages/singIn";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<SingIn />} />
    </Routes>
  );
};

export default MainRouter;
