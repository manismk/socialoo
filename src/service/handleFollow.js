import { db } from "../firebase";

export const handleFollow = (uid, currFollowing, otherUid, otherFollower) => {
  db.collection(`users/`)
    .doc(uid)
    .set({ following: [...currFollowing, otherUid] }, { merge: true })
    .catch((err) => {
      console.log(err);
    });
  db.collection(`users/`)
    .doc(otherUid)
    .set({ followers: [...otherFollower, uid] }, { merge: true })
    .catch((err) => {
      console.log(err);
    });
};
