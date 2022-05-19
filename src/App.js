import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CreatePostModal, RequiresAuth } from "./components";
import { routes } from "./constant";
import { Explore, Home, Login, Post, Profile, Saved, SignUp } from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { usePosts } from "./context";

function App() {
  const { posts } = usePosts();

  return (
    <div className="App container--100">
      <Routes>
        <Route path={routes.LOGIN_PAGE} element={<Login />} />
        <Route path={routes.SIGNUP_PAGE} element={<SignUp />} />
        <Route element={<RequiresAuth />}>
          <Route path={routes.HOME_PAGE} element={<Home />} />
          <Route path={routes.PROFILE_PAGE} element={<Profile />} />
          <Route path={routes.SAVED_PAGE} element={<Saved />} />
          <Route path={routes.EXPLORE_PAGE} element={<Explore />} />
          <Route path={routes.POST_PAGE} element={<Post />} />
        </Route>
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
