import {
  Bookmark,
  BookmarkBorder,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  MoreVert,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useAuth, useUser } from "../../context";
import { handleLike, handleSave } from "../../services";
import "./postcard.css";

export const PostCard = ({ post }) => {
  const { allUsers } = useUser();
  const { user } = useAuth();
  const [postUserData, setPostUserData] = useState({
    profilePictureUrl: "",
    firstName: "",
    lastName: "",
    isLiked: false,
    isThisPostFromCurrentUser: false,
    isSaved: false,
    savedArray: [],
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
      isLiked: post.likedIds.includes(user.uid),
      isThisPostFromCurrentUser: post.uid === user.uid,
      isSaved: allUsers.users
        .find((curr) => curr.uid === user.uid)
        .saved.includes(post.postId),
      savedArray: allUsers.users.find((curr) => curr.uid === user.uid).saved,
    }));
  }, [post, allUsers.users]);
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
        {postUserData.isThisPostFromCurrentUser ? (
          <div>
            <button className="btn btn--link">Edit</button>
            <button className="btn btn--link">Delete</button>
          </div>
        ) : (
          <div>
            <button className="btn btn--link">Follow</button>
          </div>
        )}
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
            <button
              className={`btn icon--btn post--actions ${
                postUserData.isLiked ? "active" : ""
              }`}
              title="Like"
              onClick={() =>
                handleLike(
                  postUserData.isLiked,
                  post.likedIds,
                  user.uid,
                  post.postId
                )
              }
            >
              {postUserData.isLiked ? <Favorite /> : <FavoriteBorder />}
              <span>{postUserData.isLiked ? "Liked" : "Like"}</span>
            </button>
            <button className="btn icon--btn post--actions">
              <ChatBubbleOutline />
              <span>Comment</span>
            </button>
          </div>
          <button
            className={`btn icon--btn post--actions ${
              postUserData.isSaved ? "active" : ""
            }`}
            title="Save"
            onClick={() =>
              handleSave(
                postUserData.isSaved,
                postUserData.savedArray,
                user.uid,
                post.postId
              )
            }
          >
            {postUserData.isSaved ? <Bookmark /> : <BookmarkBorder />}
            <span>{postUserData.isSaved ? "Saved" : "Save"}</span>
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
