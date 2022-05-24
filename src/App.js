import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CreatePostModal, RequiresAuth } from "./components";
import { routes } from "./constant";
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
import { auth, db } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/features/authSlice";
import {
  setPostData,
  setPostLoading,
  updateFilteredPosts,
} from "./store/features/postSlice";
import { setAllUsers, setCurrentUser } from "./store/features/userSlice";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isCreatePostModalOpen, posts } = useSelector((state) => state.post);
  const { users } = useSelector((state) => state.allUsers);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(JSON.parse(JSON.stringify(user))));
      } else {
        dispatch(setUser(false));
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    dispatch(setPostLoading(true));
    const unsubscribe = db.collection(`posts`).onSnapshot(
      (querySnapshot) => {
        dispatch(
          setPostData(
            querySnapshot.docs.map((post) =>
              JSON.parse(
                JSON.stringify({
                  ...post.data(),
                })
              )
            )
          )
        );
        dispatch(setPostLoading(false));
      },
      (err) => {
        console.log("Error in getting post listener", err);
      }
    );
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    const unsubscribe = db.collection(`users`).onSnapshot(
      (querySnapshot) => {
        dispatch(
          setAllUsers(
            querySnapshot.docs.map((user) =>
              JSON.parse(
                JSON.stringify({
                  ...user.data(),
                })
              )
            )
          )
        );
      },
      (err) => {
        console.log("Error in getting user listener", err);
      }
    );
    return () => unsubscribe();
  }, [user?.uid]);
  useEffect(() => {
    dispatch(setCurrentUser(users.find((us) => us.uid === user?.uid)));
  }, [users, user?.uid]);

  useEffect(() => {
    dispatch(updateFilteredPosts(posts));
  }, [posts]);
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
      {isCreatePostModalOpen && <CreatePostModal />}
    </div>
  );
}

export default App;
