import { toast } from "react-toastify";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
let toastId;

const updatePostInFirebase = (captionText, imageUrl, postId) => {
  db.collection(`posts/`)
    .doc(postId)
    .set(
      {
        caption: captionText,
        imageUrl,
      },
      { merge: true }
    )
    .then(() => {
      toast.update(toastId, {
        render: "Post updated successfully",
        type: "success",
        isLoading: false,
        autoClose: 800,
      });
    })
    .catch((error) => {
      toast.update(toastId, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 800,
      });
      console.log("Error in edit post", error);
    });
};

export const handleEditPost = (post, caption, imageUrl, imageFile) => {
  toastId = toast.loading("Updating post...");

  if (imageUrl !== "" && post.imageUrl !== imageUrl) {
    const uploadTask = storage
      .ref()
      .child(`posts/${post.postId}_image.${imageFile.name.split(".").pop()}`)
      .put(imageFile);

    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      () => {},
      (error) => {
        toast.update(toastId, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: 800,
        });
        console.log("Something went wrong in uploading post image", error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updatePostInFirebase(caption, downloadURL, post.postId);
        });
      }
    );
  } else {
    updatePostInFirebase(caption, imageUrl, post.postId);
  }
};
