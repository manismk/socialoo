import { Route, Routes } from "react-router-dom";
import { RequiresAuth } from "./components";
import { routes } from "./constant";
import { Home, Login, Post, Profile, SignUp } from "./pages";

function App() {
  return (
    <Routes>
      <Route path={routes.LOGIN_PAGE} element={<Login />} />
      <Route path={routes.SIGNUP_PAGE} element={<SignUp />} />
      <Route element={<RequiresAuth />}>
        <Route path={routes.HOME_PAGE} element={<Home />} />
        <Route path={routes.PROFILE_PAGE} element={<Profile />} />
        <Route path={routes.POST_PAGE} element={<Post />} />
      </Route>
    </Routes>
  );
}

export default App;
