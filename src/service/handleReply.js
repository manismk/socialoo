import { db } from "../firebase";
import { v4 as uuid } from "uuid";

export const handleReply = (comment, uid, commentObj, postComments) => {
  const newPostComments = postComments.reduce((acc, curr) => {
    if (curr.commentId === commentObj.commentId)
      return [
        ...acc,
        { ...curr, reply: [...curr.reply, { comment, uid, replyId: uuid() }] },
      ];
    else return [...acc, curr];
  }, []);

  db.collection(`posts/`)
    .doc(commentObj.postId)
    .set(
      {
        comments: [...newPostComments],
      },
      { merge: true }
    )
    .catch((error) => {
      console.log(error);
    });
};
