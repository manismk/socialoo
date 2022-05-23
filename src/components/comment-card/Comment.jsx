import { Reply } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context";
import { CommentInput } from "./CommentInput";
import { ReplyComment } from "./ReplyComment";

export const Comment = ({ comment, postComments }) => {
  const { allUsers } = useUser();
  const [showReply, setShowReply] = useState(false);
  const [commentUser, setCommentUser] = useState({});
  useEffect(() => {
    setCommentUser(allUsers.users.find((user) => user.uid === comment.uid));
  }, []);
  return (
    <div className="user--comment--container">
      <div className="user--comment--wrapper">
        <img
          src={commentUser?.profilePictureUrl}
          alt=""
          className="avatar avatar--circle avatar--xs"
        />
        <div className="user--name--comment-container">
          <Link
            to={`/user/${comment.uid}`}
            className="text--bold comment--name"
          >{`${commentUser?.firstName} ${commentUser?.lastName}`}</Link>
          <div>{comment.comment}</div>
        </div>
        <button
          className="btn icon--btn post--actions"
          onClick={() => setShowReply((prev) => !prev)}
        >
          <Reply />
          <span>Reply</span>
        </button>
      </div>
      {showReply && (
        <CommentInput
          from="Reply"
          fromObj={{
            comment,
            postComments,
            callClose: () => setShowReply(false),
          }}
        />
      )}
      {comment.reply.length > 0 &&
        comment.reply.map((rep) => (
          <ReplyComment reply={rep} key={rep.replyId} />
        ))}
    </div>
  );
};
