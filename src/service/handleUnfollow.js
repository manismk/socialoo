import { db } from "../firebase";

export const handleUnfollow = (
  uid,
  currFollowing,
  otherUid,
  otherFollowers
) => {
  db.collection(`users/`)
    .doc(uid)
    .set(
      {
        following: currFollowing.filter(
          (followingId) => followingId !== otherUid
        ),
      },
      { merge: true }
    )
    .catch((err) => {
      console.log(err);
    });
  db.collection(`users/`)
    .doc(otherUid)
    .set(
      { followers: otherFollowers.filter((followerId) => followerId !== uid) },
      { merge: true }
    )
    .catch((err) => {
      console.log(err);
    });
};
