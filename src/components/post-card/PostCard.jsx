import {
  BookmarkBorder,
  ChatBubbleOutline,
  FavoriteBorder,
  MoreVert,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useUser } from "../../context";
import "./postcard.css";

export const PostCard = ({ post }) => {
  const { allUsers } = useUser();
  const [postUserData, setPostUserData] = useState({
    profilePictureUrl: "",
    firstName: "",
    lastName: "",
  });
  useEffect(() => {
    const { profilePictureUrl, firstName, lastName } = allUsers.users.find(
      (user) => user.uid === post.uid
    );
    setPostUserData((prev) => ({
      ...prev,
      profilePictureUrl,
      firstName,
      lastName,
    }));
  }, []);
  return (
    <div className="post--card">
      <div className="post--header">
        <div>
          <img
            src={postUserData.profilePictureUrl}
            alt="Randomuser"
            className="avatar avatar--circle avatar--xs"
          />
          <p className="post--user--name">
            {postUserData.firstName} {postUserData.lastName}
          </p>
        </div>
        <div>
          <button className="btn btn--link">Follow</button>
          <button className="btn icon--btn">
            <MoreVert />
          </button>
        </div>
      </div>
      {post.imageUrl && (
        <div className="post--image--container">
          <img className="img--res" src={post.imageUrl} alt="sample " />
        </div>
      )}
      <div className="post--description">{post.caption}</div>
      <div className="post--footer">
        <div className="post--action--container">
          <div>
            <button className="btn icon--btn post--actions" title="Like">
              <FavoriteBorder />
              <span>Like</span>
            </button>
            <button className="btn icon--btn post--actions">
              <ChatBubbleOutline />
              <span>Comment</span>
            </button>
          </div>
          <button className="btn icon--btn post--actions">
            <BookmarkBorder />
            <span>Save</span>
          </button>
        </div>
        <div className="post--status">
          <p className="post--likes">{post.likedIds?.length} Likes</p>
          <p className="post--time">19 Hours ago</p>
        </div>
      </div>
    </div>
  );
};
