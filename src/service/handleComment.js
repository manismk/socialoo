import { db } from "../firebase";
import { v4 as uuid } from "uuid";

export const handleComment = (comment, uid, postId, comments) => {
  db.collection(`posts/`)
    .doc(postId)
    .set(
      {
        comments: [
          ...comments,
          { comment, uid, reply: [], commentId: uuid(), postId },
        ],
      },
      { merge: true }
    )
    .catch((error) => {
      console.log(error);
    });
};
