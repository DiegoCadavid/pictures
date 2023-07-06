import { api } from "@/utils/api";
import PostComment from "./PostComment";
import { type CommentWithUser } from "@/types";

interface Props {
  comments: CommentWithUser[];
  isLoading: boolean;
}

const PostCommentsContainer = ({ comments, isLoading }: Props) => {

  if (isLoading) return <div className="mt-4">Loading...</div>;

  if (comments.length == 0)
    return (
      <div className="mt-4 italic text-zinc-400 ">
        Be the first to comment!!
      </div>
    );

  return (
    <div className="mt-4 flex flex-col gap-4">
      {comments.map((comment) => {
        return <PostComment key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export default PostCommentsContainer;
