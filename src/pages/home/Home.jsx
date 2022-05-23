import { useEffect, useState } from "react";
import { Filter, Loader, PostCard, SuggestionCard } from "../../components/";
import { useFilter, usePosts, useUser } from "../../context";
import "./home.css";

export const Home = () => {
  const { allUsers } = useUser();
  const { filterState } = useFilter();

  const [followersPost, setFollowersPost] = useState([]);
  useEffect(() => {
    setFollowersPost(
      filterState.filteredPosts.filter((post) =>
        allUsers?.currentUser?.following?.includes(post.uid)
      )
    );
  }, [filterState.filteredPosts, allUsers.currentUser]);

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
      {/* {postLoading && <Loader />} */}
    </div>
  );
};
