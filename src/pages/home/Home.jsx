import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Filter, Loader, PostCard, SuggestionCard } from "../../components/";

import "./home.css";

export const Home = () => {
  const { currentUser } = useSelector((state) => state.allUsers);
  const { filteredPosts, postLoadingStatus } = useSelector(
    (state) => state.post
  );

  const [followersPost, setFollowersPost] = useState([]);
  useEffect(() => {
    setFollowersPost(
      filteredPosts.filter((post) => currentUser?.following?.includes(post.uid))
    );
  }, [filteredPosts, currentUser]);

  return (
    <div className="container">
      <div className="post--container">
        {followersPost.length > 0 ? (
          <>
            <Filter />
            {followersPost.map((post) => {
              return <PostCard post={post} key={post.postId} />;
            })}
          </>
        ) : (
          <p className="text--center para--md text--bold">
            No post from following users.
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
