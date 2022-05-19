import { db } from "../firebase";

export const handleLike = (isLiked, likesArray, uid, postId) => {
  if (isLiked) {
    likesArray = likesArray.filter((likeId) => likeId !== uid);
  } else {
    likesArray = [...likesArray, uid];
  }
  db.collection(`posts/`)
    .doc(postId)
    .set(
      {
        likedIds: likesArray,
      },
      { merge: true }
    )
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
