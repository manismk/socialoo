import { db, storage } from "../firebase";

export const handleDeletePost = (postId, postImg) => {
  if (postImg !== null) {
    storage
      .ref()
      .child(
        `posts/${postId}_image.${postImg.split("_image.")[1].split("?alt")[0]}`
      )
      .delete()
      .catch((err) => console.log(err));
  }

  db.collection(`posts/`)
    .doc(postId)
    .delete()
    .catch((err) => {
      console.log(err);
    });
};
