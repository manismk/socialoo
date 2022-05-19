import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context";

export const ReplyComment = ({ reply }) => {
  const { allUsers } = useUser();
  const [commentUser, setCommentUser] = useState({});

  useEffect(() => {
    setCommentUser(allUsers.users.find((user) => user.uid === reply.uid));
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
