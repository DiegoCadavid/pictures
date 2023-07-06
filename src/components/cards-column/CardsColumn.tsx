import {type  PostWithTagsAndBookmarks } from "@/types";
import Card from "../card/Card";

interface Props { 
  posts: PostWithTagsAndBookmarks[]
}

const CardsColumn = ({posts}: Props) => {
  return (
    <div className="flex flex-1 flex-col gap-4">
      { posts.map(post => <Card key={post.id} {...post }/>) }
    </div>
  );
};

export default CardsColumn;
