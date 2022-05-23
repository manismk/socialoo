import { Filter, Loader, PostCard, SuggestionCard } from "../../components/";
import { useFilter, usePosts } from "../../context";

export const Explore = () => {
  const { filterState } = useFilter();

  return (
    <div className="container">
      <div className="post--container">
        <Filter />
        {filterState.filteredPosts.map((post) => {
          return <PostCard post={post} key={post.postId} />;
        })}
      </div>
      <div className="suggestion--container">
        <SuggestionCard />
      </div>
      {/* {postLoading && <Loader />} */}
    </div>
  );
};
