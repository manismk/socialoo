import {
  Bookmark,
  BookmarkBorder,
  ChatBubbleOutline,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  handleDeletePost,
  handleFollow,
  handleLike,
  handleSave,
  handleUnfollow,
} from "../../service";
import { openPostModalFromEdit } from "../../store/features/postSlice";
import { getPostTime } from "../../utils";
import "./postCard.css";

export const PostCard = ({ post }) => {
  const { users, currentUser } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
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
    const postUser = users.find((user) => user.uid === post.uid);
    setPostUserData((prev) => ({
      ...prev,
      profilePictureUrl: postUser?.profilePictureUrl,
      firstName: postUser?.firstName,
      lastName: postUser?.lastName,
      isLiked: post.likedIds.includes(user.uid),
      isThisPostFromCurrentUser: post.uid === user.uid,
      isSaved: currentUser?.saved?.includes(post.postId),
      savedArray: currentUser?.saved,
      isAlreadyFollowing: currentUser?.following?.includes(post.uid),
      postFollowers: postUser?.followers,
    }));
  }, [post, users, currentUser, user?.uid]);
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
              onClick={() => dispatch(openPostModalFromEdit(post))}
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
                      currentUser.uid,
                      currentUser.following,
                      post.uid,
                      postUserData.postFollowers
                    )
                  : handleFollow(
                      currentUser.uid,
                      currentUser.following,
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
              <svg
                aria-label="Share Post"
                className="_8-yf5 "
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  x1="22"
                  x2="9.218"
                  y1="3"
                  y2="10.083"
                ></line>
                <polygon
                  fill="none"
                  points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></polygon>
              </svg>
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
          <p className="post--likes">
            {post.likedIds?.length}{" "}
            {`Like${post.likedIds?.length > 1 ? "s" : ""}`}
          </p>
          <p className="post--comments">
            {post.comments?.length}{" "}
            {`Comment${post.comments?.length > 1 ? "s" : ""}`}
          </p>
          <p className="post--time">
            {getPostTime(new Date(post.createdAt?.seconds * 1000))}
          </p>
        </div>
      </div>
    </div>
  );
};
