import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../navbar/Navbar";

export const RequiresAuth = () => {
  const { user } = useSelector((state) => state.auth);

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
