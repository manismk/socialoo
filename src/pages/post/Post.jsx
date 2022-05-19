import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentContainer, PostCard } from "../../components";
import { usePosts } from "../../context";
import "./post.css";

export const Post = () => {
  const { postId } = useParams();
  const { posts } = usePosts();
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    setCurrentPost(posts.posts.find((post) => post.postId === postId));
  }, [postId, posts]);
  return (
    <>
      {currentPost ? (
        <div className="container container--post">
          <PostCard post={currentPost} />
          <CommentContainer post={currentPost} />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
