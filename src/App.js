import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CreatePostModal, RequiresAuth } from "./components";
import { routes } from "./constant";
import { usePosts } from "./context";
import {
  Error404,
  Explore,
  Home,
  Login,
  Post,
  Profile,
  Saved,
  SignUp,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./store/features/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(JSON.parse(JSON.stringify(user))));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, []);

  const { posts } = usePosts();
  return (
    <div className="App container--100">
      <Routes>
        <Route path={routes.LOGIN_PAGE} element={<Login />} />
        <Route path={routes.SIGNUP_PAGE} element={<SignUp />} />
        <Route element={<RequiresAuth />}>
          <Route path={routes.HOME_PAGE} element={<Home />} />
          <Route path={routes.PROFILE_PAGE} element={<Profile />} />
          <Route path={routes.POST_PAGE} element={<Post />} />
          <Route path={routes.EXPLORE_PAGE} element={<Explore />} />
          <Route path={routes.SAVED_PAGE} element={<Saved />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
      <ToastContainer
        position="top-right"
        pauseOnHover={true}
        autoClose={800}
        newestOnTop={true}
        limit={2}
        style={{ top: "5rem" }}
      />
      {posts?.isCreatePostModalOpen && <CreatePostModal />}
    </div>
  );
}

export default App;
