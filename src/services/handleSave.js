import { db } from "../firebase";

export const handleSave = (isSaved, savedArray, uid, postId) => {
  if (isSaved) {
    savedArray = savedArray.filter((saveId) => saveId !== postId);
  } else {
    savedArray = [...savedArray, postId];
  }
  db.collection(`users/`)
    .doc(uid)
    .set(
      {
        saved: savedArray,
      },
      { merge: true }
    )
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};
