import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import SingIn from "../pages/singIn";
import SingUp from "../pages/singUp";

const MainRouter = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<SingIn />} />
      <Route path="/" element={<SingUp />} />
    </Routes>
  );
};

export default MainRouter;
