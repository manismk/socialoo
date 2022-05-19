import { Route, Routes } from "react-router-dom";
import { routes } from "./constant";
import { Login, SignUp } from "./pages";

function App() {
  return (
    <Routes>
      <Route path={routes.LOGIN_PAGE} element={<Login />} />
      <Route path={routes.SIGNUP_PAGE} element={<SignUp />} />
    </Routes>
  );
}

export default App;
