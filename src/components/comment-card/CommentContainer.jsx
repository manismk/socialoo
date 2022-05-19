import { CommentInput } from "./CommentInput";
import { Comment } from "./Comment";

export const CommentContainer = ({ post }) => {
  return (
    <div className="comment--container">
      <CommentInput from="Comment" fromObj={{ post }} />
      {post.comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.commentId}
          postComments={post.comments}
        />
      ))}
    </div>
  );
};
