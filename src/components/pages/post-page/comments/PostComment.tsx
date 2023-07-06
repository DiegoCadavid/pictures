import Image from "next/image";
import Link from "next/link";
import { format, formatDistance, formatRelative, subDays } from "date-fns";

import { type CommentWithUser } from "@/types";

interface Props {
  comment: CommentWithUser;
}

const PostComment = ({comment}: Props) => {
  const { author, content, createdAt } = comment;

  return (
    <div className="flex gap-2">
      <Image
        src={author.image || "/user_icon.png"}
        alt="image"
        width={32}
        height={32}
        className="h-fit w-fit rounded-full"
      />

      <div className="rounded-lg bg-zinc-200 p-3">
        <p className="flex items-center gap-2">
          <Link href={`/user/${author.id}`}className="font-medium hover:underline">
            @{author.name}
          </Link>
          <span className="h-1 w-1 rounded-full bg-zinc-300"></span>
          <span className="text-sm text-zinc-400">
            {" "}
            {formatDistance(new Date(createdAt), new Date(), {
              addSuffix: true,
              includeSeconds: true
            })}{" "}
          </span>
        </p>

        <p>{content}</p>
      </div>
    </div>
  );
};

export default PostComment;
