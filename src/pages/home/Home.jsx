import { PostCard, SuggestionCard } from "../../components/";
import { usePosts } from "../../context";
import "./home.css";

export const Home = () => {
  const { posts } = usePosts();

  return (
    <div className="container">
      <div className="post--container">
        {posts.posts.map((post) => {
          return <PostCard post={post} key={post.postId} />;
        })}
      </div>
      <div className="suggestion--container">
        <SuggestionCard />
      </div>
    </div>
  );
};
