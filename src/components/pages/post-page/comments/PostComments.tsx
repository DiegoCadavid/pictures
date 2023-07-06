import { useState } from "react";
import { api } from "@/utils/api";
import PostCommentForm from "./PostCommentForm";
import PostCommentsContainer from "./PostCommentsContainer";
import { type CommentWithUser } from "@/types";

interface Props {
  postId: string;
}

const PostComments = ({ postId }: Props) => {
  const comments = api.post.getAllComments.useQuery(postId);
  const [commentsUser, setCommentsUser] = useState<CommentWithUser[]>([]);

  const handleAddComment = (comment: CommentWithUser) => {
    setCommentsUser([...commentsUser, comment]);
  };
  return (
    <div className="mt-4 ">
      <PostCommentForm postId={postId} handleAddComment={handleAddComment} />
      <PostCommentsContainer
        isLoading={comments.isLoading}
        comments={[
          ...commentsUser,
          ...(comments.data?.filter((c) => {
            return !commentsUser.map((cu) => cu.id).includes(c.id);
          }) || []),
        ]}
      />
    </div>
  );
};

export default PostComments;
