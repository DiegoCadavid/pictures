import Image from "next/image";
import { useRouter } from "next/router";

import { type PostWithTagsAndBookmarks } from "@/types";
import Bookmark from "../bookmark/Bookmark";
import { useContext } from "react";
import postContext from "@/contexts/postContext";

const Card = (props: PostWithTagsAndBookmarks) => {
  const {
    imageUrl,
    imageHeight,
    imageWidth,
    imageColorHex,
    title,
    tags,
    id,
    bookmarks,
  } = props;

  const postCtx = useContext(postContext);

  const router = useRouter();

  const navigate = () => {
    postCtx?.handleImageSelect(id, {
      imageColorHex,
      imageHeight,
      imageUrl,
      imageWidth,
    });

    router.push(`/post/${id}`).catch((err) => {
      console.log(err);
    });
  };

  return (
    <article className="group relative w-full overflow-hidden rounded-2xl">
      <button onClick={navigate}>
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
      </button>

      {/* Actions */}
      <div className="pointer-events-none absolute inset-0 hidden items-end bg-gradient-to-t from-black/80  via-transparent p-4 group-hover:grid">
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
