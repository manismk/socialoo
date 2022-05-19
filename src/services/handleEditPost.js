import { toast } from "react-toastify";
import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";

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
      toast.success("Post updated successfully");
    })
    .catch((error) => {
      toast.error("Something Went wrong");
      console.log(error);
    });
};

export const handleEditPost = (post, caption, imageUrl, imageFile) => {
  if (imageUrl !== "" && post.imageUrl !== imageUrl) {
    const uploadTask = storage
      .ref()
      .child(`posts/${post.postId}_image.${imageFile.name.split(".").pop()}`)
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
          updatePostInFirebase(caption, downloadURL, post.postId);
        });
      }
    );
  } else {
    updatePostInFirebase(caption, imageUrl, post.postId);
  }
};
