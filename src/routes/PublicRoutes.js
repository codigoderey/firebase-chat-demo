import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const PublicRoutes = () => {
  return (
    <AuthLayout>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </AuthLayout>
  );
};

export default PublicRoutes;
