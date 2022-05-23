import { useState } from "react";
import { InputTextBox } from "../";
import { useUser } from "../../context";
import { handleComment, handleReply } from "../../service";

export const CommentInput = ({ from, fromObj }) => {
  const { allUsers } = useUser();
  const [commentData, setCommentData] = useState({
    comment: "",
    commentError: "",
  });

  const clickHandler = () => {
    if (commentData.comment.length === 0) {
      setCommentData((prev) => ({
        ...prev,
        commentError: `${from} can't be empty`,
      }));
    }
    if (commentData.comment.length > 0 && from === "Comment") {
      handleComment(
        commentData.comment,
        allUsers?.currentUser.uid,
        fromObj.post.postId,
        fromObj.post.comments
      );
      setCommentData((prev) => ({ ...prev, comment: "" }));
    }
    if (commentData.comment.length > 0 && from === "Reply") {
      handleReply(
        commentData.comment,
        allUsers?.currentUser.uid,
        fromObj.comment,
        fromObj.postComments
      );
      setCommentData((prev) => ({ ...prev, comment: "" }));
      fromObj.callClose();
    }
  };

  return (
    <div className="comment--input">
      <img
        src={allUsers?.currentUser?.profilePictureUrl}
        alt=""
        className="avatar avatar--circle avatar--xs"
      />
      <InputTextBox
        error={commentData.commentError}
        labelName={from}
        id={from}
        placeHolder={`Enter your ${from} here...`}
        changeHandler={(e) => {
          setCommentData((prevData) => ({
            ...prevData,
            comment: e.target.value,
            commentError: "",
          }));
        }}
        type="text"
        value={commentData.comment}
      />
      <button className="btn btn--primary" onClick={clickHandler}>
        Post
      </button>
    </div>
  );
};
