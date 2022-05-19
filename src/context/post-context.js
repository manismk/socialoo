import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "./auth-context";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState({
    posts: [],
    isCreatePostModalOpen: false,
    isFromEdit: false,
    editData: {},
  });
  const [postLoading, setPostLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setPostLoading(true);
    try {
      db.collection(`posts`).onSnapshot((querySnapshot) => {
        setPosts((prev) => ({
          ...prev,
          posts: querySnapshot.docs.map((post) => ({
            ...post.data(),
          })),
        }));
        setPostLoading(false);
      });
    } catch (e) {
      console.error("Error in getting posts data", e);
      setPostLoading(false);
    }
  }, [user]);

  const openModalFromEdit = (editData) =>
    setPosts((prev) => ({
      ...prev,
      isCreatePostModalOpen: true,
      isFromEdit: true,
      editData,
    }));

  const openModal = () =>
    setPosts((prev) => ({ ...prev, isCreatePostModalOpen: true }));

  const closeModal = () =>
    setPosts((prev) => ({
      ...prev,
      isCreatePostModalOpen: false,
      isFromEdit: false,
      editData: {},
    }));

  return (
    <PostContext.Provider
      value={{
        posts,
        openModal,
        closeModal,
        openModalFromEdit,
        postLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePosts = () => useContext(PostContext);
export { usePosts, PostProvider };
