import { db, storage } from "../firebase";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";

const createPostInFirebase = (captionText, imageUrl, newPostId, uid) => {
  db.collection(`posts/`)
    .doc(newPostId.id)
    .set(
      {
        caption: captionText,
        imageUrl,
        uid,
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

export const handleCreatePost = (captionText, imageFile, uid) => {
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
          createPostInFirebase(captionText, downloadURL, newPostId, uid);
        });
      }
    );
  } else {
    createPostInFirebase(captionText, imageFile, newPostId, uid);
  }
};
