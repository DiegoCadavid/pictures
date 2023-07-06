/* eslint-disable @typescript-eslint/no-misused-promises */
import { CommentWithUser } from "@/types";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  postId: string;
  responseId?: string;
  handleAddComment: (c: CommentWithUser) => void;
}

interface Inputs {
  content: string;
}

const PostCommentForm = ({ postId, responseId, handleAddComment }: Props) => {
  const { status, data: session } = useSession();
  const commentCreate = api.post.commentCreate.useMutation();
  const { register, watch, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const comment = await commentCreate.mutateAsync({
      response: responseId,
      post: postId,
      content: data.content,
    });

    
    handleAddComment(comment);

    reset();
  };

  if(status == "unauthenticated") {
    return;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4">
      <input
        type="text"
        disabled={commentCreate.isLoading}
        placeholder="Add a comment..."
        className="input-text flex-1"
        {...register("content", {
          required: true,
        })}
      />

      <button
        disabled={watch("content")?.length <= 0 || commentCreate.isLoading}
        type="submit"
        className="btn-icon btn-primary flex-shrink-0 disabled:bg-zinc-300 disabled:hover:bg-zinc-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
        </svg>
      </button>
    </form>
  );
};

export default PostCommentForm;
