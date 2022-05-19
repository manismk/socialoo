import {
  Bookmark,
  BookmarkBorder,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
  Share,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, usePosts, useUser } from "../../context";
import {
  handleDeletePost,
  handleFollow,
  handleLike,
  handleSave,
  handleUnfollow,
} from "../../services";
import "./postcard.css";

export const PostCard = ({ post }) => {
  const { allUsers } = useUser();
  const { user } = useAuth();
  const { openModalFromEdit } = usePosts();
  const navigate = useNavigate();
  const [postUserData, setPostUserData] = useState({
    profilePictureUrl: "",
    firstName: "",
    lastName: "",
    isLiked: false,
    isThisPostFromCurrentUser: false,
    isSaved: false,
    savedArray: [],
    isAlreadyFollowing: false,
  });

  useEffect(() => {
    const { profilePictureUrl, firstName, lastName, followers } =
      allUsers.users.find((user) => user.uid === post.uid);
    setPostUserData((prev) => ({
      ...prev,
      profilePictureUrl,
      firstName,
      lastName,
      isLiked: post.likedIds.includes(user.uid),
      isThisPostFromCurrentUser: post.uid === user.uid,
      isSaved: allUsers?.currentUser?.saved?.includes(post.postId),
      savedArray: allUsers?.currentUser?.saved,
      isAlreadyFollowing: allUsers?.currentUser?.following?.includes(post.uid),
      postFollowers: followers,
    }));
  }, [post, allUsers, user]);
  return (
    <div className="post--card">
      <div className="post--header">
        <div>
          <img
            src={postUserData.profilePictureUrl}
            alt="Randomuser"
            className="avatar avatar--circle avatar--xs"
          />
          <Link to={`/user/${post.uid}`} className="post--user--name">
            {postUserData.firstName} {postUserData.lastName}
          </Link>
        </div>
        {postUserData.isThisPostFromCurrentUser ? (
          <div>
            <button
              className="btn btn--link"
              onClick={() => openModalFromEdit(post)}
            >
              Edit
            </button>
            <button
              className="btn btn--link"
              onClick={() => {
                handleDeletePost(post.postId, post.imageUrl);
              }}
            >
              Delete
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn--link"
              onClick={() =>
                postUserData.isAlreadyFollowing
                  ? handleUnfollow(
                      allUsers?.currentUser.uid,
                      allUsers?.currentUser.following,
                      post.uid,
                      postUserData.postFollowers
                    )
                  : handleFollow(
                      allUsers?.currentUser.uid,
                      allUsers?.currentUser.following,
                      post.uid,
                      postUserData.postFollowers
                    )
              }
            >
              {postUserData.isAlreadyFollowing ? "Unfollow" : "Follow"}
            </button>
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
            <button
              className="btn icon--btn post--actions"
              onClick={() => navigate(`/post/${post.postId}`)}
            >
              <ChatBubbleOutline />
              <span>Comment</span>
            </button>
            <button
              className="btn icon--btn post--actions"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/post/${post.postId}`
                );
                toast.success("Link copied to clipboard");
              }}
            >
              <Share />
              <span>Share</span>
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
