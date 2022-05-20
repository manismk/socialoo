import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context";
import { Navbar } from "../navbar/Navbar";

export const RequiresAuth = () => {
  let { user } = useAuth();
  const location = useLocation();

  if (user === false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};
