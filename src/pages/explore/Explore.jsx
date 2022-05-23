import { useSelector } from "react-redux";
import { Filter, Loader, PostCard, SuggestionCard } from "../../components/";

export const Explore = () => {
  const { filteredPosts } = useSelector((state) => state.post);

  return (
    <div className="container">
      <div className="post--container">
        <Filter />
        {filteredPosts.map((post) => {
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
