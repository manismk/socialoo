import { createContext, useContext, useEffect, useState } from "react";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";
import { useAuth } from "./auth-context";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState({
    posts: [],
    isCreatePostModalOpen: false,
    isFromEdit: false,
    editData: {},
  });
  const { user } = useAuth();

  useEffect(() => {
    try {
      db.collection(`posts`).onSnapshot((querySnapshot) => {
        setPosts((prev) => ({
          ...prev,
          posts: querySnapshot.docs.map((post) => ({
            ...post.data(),
          })),
        }));
      });
    } catch (e) {
      console.error("Error in getting posts data", e);
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

  const createPostInFirebase = (captionText, imageUrl, newPostId) => {
    db.collection(`posts/`)
      .doc(newPostId.id)
      .set(
        {
          caption: captionText,
          imageUrl,
          uid: user.uid,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          likedIds: [],
          comments: [],
          postId: newPostId.id,
        },
        { merge: true }
      )
      .then(() => {
        toast.success("Posted successfully");
      })
      .catch((error) => {
        toast.error("Something Went wrong");
        console.log(error);
      });
  };

  const createPost = (captionText, imageFile) => {
    const newPostId = db.collection(`posts/`).doc();

    if (imageFile !== null) {
      const uploadTask = storage
        .ref()
        .child(`posts/${newPostId.id}_image.${imageFile.name.split(".").pop()}`)
        .put(imageFile);

      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {},
        (error) => {
          toast.error("Something Went wrong");
          console.log("Something went wrong in uploading post image", error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            createPostInFirebase(captionText, downloadURL, newPostId);
          });
        }
      );
    } else {
      createPostInFirebase(captionText, imageFile, newPostId);
    }
  };

  return (
    <PostContext.Provider
      value={{ posts, openModal, closeModal, createPost, openModalFromEdit }}
    >
      {children}
    </PostContext.Provider>
  );
};

const usePosts = () => useContext(PostContext);

export { usePosts, PostProvider };
