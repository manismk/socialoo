import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Loader, PostCard, SuggestionCard } from "../../components";

export const Saved = () => {
  const { posts, postLoadingStatus } = useSelector((state) => state.post);
  const { currentUser } = useSelector((state) => state.allUsers);
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    setSavedPosts(
      posts.filter((currPost) => currentUser?.saved?.includes(currPost.postId))
    );
  }, [currentUser?.saved, posts]);

  return (
    <div className="container">
      <div className="post--container">
        {savedPosts.length > 0 ? (
          savedPosts.map((post) => {
            return <PostCard post={post} key={post.postId} />;
          })
        ) : (
          <p className="text--center para--md text--bold">
            No saved posts found
          </p>
        )}
      </div>
      <div className="suggestion--container">
        <SuggestionCard />
      </div>
      {postLoadingStatus && <Loader />}
    </div>
  );
};
