import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CommentContainer, Loader, PostCard } from "../../components";
import "./post.css";

export const Post = () => {
  const { postId } = useParams();
  const { posts, postLoadingStatus } = useSelector((state) => state.post);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    setCurrentPost(posts.find((post) => post.postId === postId));
  }, [postId, posts]);

  return (
    <>
      {currentPost ? (
        <div className="container container--post">
          <PostCard post={currentPost} />
          <CommentContainer post={currentPost} />
        </div>
      ) : (
        <p className="text--center para--md text--bold">No posts found</p>
      )}
      {postLoadingStatus && <Loader />}
    </>
  );
};
