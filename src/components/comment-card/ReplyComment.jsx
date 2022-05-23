import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ReplyComment = ({ reply }) => {
  const { users } = useSelector((state) => state.allUsers);
  const [commentUser, setCommentUser] = useState({});

  useEffect(() => {
    setCommentUser(users.find((user) => user.uid === reply.uid));
  }, []);
  return (
    <div className="user--comment--wrapper user--reply">
      <img
        src={commentUser?.profilePictureUrl}
        alt=""
        className="avatar avatar--circle avatar--xs"
      />
      <div className="user--name--comment-container ">
        <Link
          to={`/user/${reply.uid}`}
          className="text--bold comment--name"
        >{`${commentUser.firstName} ${commentUser.lastName}`}</Link>
        <div>{reply.comment}</div>
      </div>
    </div>
  );
};
