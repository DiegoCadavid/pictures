import Bookmark from "@/components/bookmark/Bookmark";
import postContext from "@/contexts/postContext";
import { PostImage } from "@/types";
import Image from "next/image";
import { useContext } from "react";

interface Props {
  postId: string;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageColorHex?: string;

  bookmarks?: string | null;
  tags?: string[];
}

const PostImage = ({
  postId,
  imageUrl,
  imageHeight,
  imageWidth,
  tags,
  imageColorHex,
  bookmarks,
}: Props) => {
  const postCtx = useContext(postContext);

  const postImage: Partial<PostImage> =
    postCtx?.id === postId && postCtx.imageSelected
      ? postCtx.imageSelected
      : {
          imageColorHex,
          imageHeight,
          imageUrl,
          imageWidth,
        };

  if (postImage.imageUrl === undefined) {
    return (
      <div className="z-10 h-[400px] flex-1 animate-pulse rounded-2xl bg-zinc-300"></div>
    );
  }

  return (
    <div className="group relative z-10 h-fit flex-1 overflow-hidden rounded-2xl">
      <Image
        src={postImage.imageUrl}
        height={postImage.imageHeight}
        width={postImage.imageWidth}
        alt="Image"
        priority={true}
        className="w-full"
        style={{
          backgroundColor: postImage.imageColorHex,
        }}
        placeholder="empty"
      />

      {tags && tags.length > 0 && bookmarks !== undefined && (
        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/40 via-transparent p-4 group-hover:flex md:hidden md:items-start md:bg-gradient-to-b md:from-black/70">
          <p className="italic text-white">{tags.join(", ")} </p>
          <div className="flex gap-2">
            <button className=" btn-icon btn-light flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 "
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <Bookmark postId={postId} bookmarks={bookmarks} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostImage;
