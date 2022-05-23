import { useEffect, useState } from "react";
import { Loader, PostCard, SuggestionCard } from "../../components";
import { usePosts, useUser } from "../../context";

export const Saved = () => {
  const { posts, postLoading } = usePosts();
  const { allUsers } = useUser();
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    setSavedPosts(
      posts.posts.filter((currPost) =>
        allUsers?.currentUser?.saved?.includes(currPost.postId)
      )
    );
  }, [allUsers?.currentUser?.saved, posts.posts]);

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
      {/* {postLoading && <Loader />} */}
    </div>
  );
};
