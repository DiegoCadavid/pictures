import { type PostWithTagsAndBookmarks } from "types";
import CardsColumn from "./CardsColumn";
import divideArray from "@/utils/divideArray";

interface Props {
  posts: PostWithTagsAndBookmarks[];
}

const CardColumnsContainer = ({ posts }: Props) => {
  const dividedPosts = divideArray(posts, 5);

  return (
    <div className="flex gap-4">
      {dividedPosts.map((posts, i) => {
        return <CardsColumn key={i} posts={posts} />;
      })}
    </div>
  );
};

export default CardColumnsContainer;
