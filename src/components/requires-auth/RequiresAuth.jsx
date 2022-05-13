import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";

export const RequiresAuth = () => {
  // let { authData } = useAuth();
  // const location = useLocation();

  // if (!authData.isLoggedIn) {
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};
