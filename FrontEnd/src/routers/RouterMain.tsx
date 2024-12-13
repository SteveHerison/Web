import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import SingIn from "../pages/singIn";
import SingUp from "../pages/singUp";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const MainRouter = () => {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<SingIn />} />
      <Route path="/" element={<SingUp />} />
    </Routes>
  );
};

export default MainRouter;
