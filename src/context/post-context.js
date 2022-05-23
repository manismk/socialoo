import { createContext, useContext, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState({
    posts: [],
    isCreatePostModalOpen: false,
    isFromEdit: false,
    editData: {},
  });

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
        setPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePosts = () => useContext(PostContext);
export { usePosts, PostProvider };
