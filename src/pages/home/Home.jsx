import { useEffect, useState } from "react";
import { Loader, PostCard, SuggestionCard } from "../../components/";
import { usePosts, useUser } from "../../context";
import "./home.css";

export const Home = () => {
  const { posts, postLoading } = usePosts();
  const { allUsers } = useUser();
  const [followersPost, setFollowersPost] = useState([]);
  useEffect(() => {
    setFollowersPost(
      posts.posts.filter((post) =>
        allUsers?.currentUser?.following?.includes(post.uid)
      )
    );
  }, [posts, allUsers.currentUser]);

  return (
    <div className="container">
      <div className="post--container">
        {followersPost.length > 0 ? (
          followersPost.map((post) => {
            return <PostCard post={post} key={post.postId} />;
          })
        ) : (
          <p className="text--center para--md text--bold">
            No post from following users.
          </p>
        )}
      </div>
      <div className="suggestion--container">
        <SuggestionCard />
      </div>
      {postLoading && <Loader />}
    </div>
  );
};
