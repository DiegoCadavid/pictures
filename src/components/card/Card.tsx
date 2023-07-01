import Image from "next/image";
import Link from "next/link";
import { type PostWithTagsAndBookmarks } from "types";
import Bookmark from "../bookmark/Bookmark";

const Card = ({
  imageUrl,
  imageHeight,
  imageWidth,
  imageColorHex,
  title,
  tags,
  id,
  bookmarks,
}: PostWithTagsAndBookmarks) => {
  return (
    <article className="group relative w-full overflow-hidden rounded-2xl">
      <Link href={`/post/${id}`}>
        <Image
          src={imageUrl}
          alt="Image"
          className="w-full"
          style={{
            backgroundColor: imageColorHex,
          }}
          width={imageWidth}
          height={imageHeight}
          placeholder="empty"
        />
      </Link>

      {/* Actions */}
      <div className="absolute inset-0 hidden items-end bg-gradient-to-t from-black/80 via-transparent  p-4 group-hover:grid pointer-events-none">
        <div className="flex min-w-0 gap-2">
          <div className="flex-shrink flex-grow basis-auto overflow-hidden whitespace-nowrap text-white">
            <p className="overflow-hidden text-ellipsis font-semibold">
              {title}
            </p>
            <p className="overflow-hidden text-ellipsis text-sm italic">
              {tags.join(", ")}
            </p>
          </div>

          <Bookmark postId={id} bookmarks={bookmarks} />
        </div>
      </div>
    </article>
  );
};

export default Card;
