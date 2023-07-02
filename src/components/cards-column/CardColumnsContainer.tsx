import { type PostWithTagsAndBookmarks } from "types";
import CardsColumn from "./CardsColumn";
import divideArray from "@/utils/divideArray";
import { useEffect, useState } from "react";

interface Props {
  posts: PostWithTagsAndBookmarks[];
}

const columnsBreakpoints: { [key: number]: number } = {
  768: 2,
  1024: 3,
  1280: 4,
  1536: 5,
};

const CardColumnsContainer = ({ posts }: Props) => {
  const [columns, setColumns] = useState<number>(5);
  const [dividedPosts, setDividedPosts] = useState<
    PostWithTagsAndBookmarks[][]
  >([]);

  useEffect(() => {
    setDividedPosts(divideArray(posts, columns));
  }, [columns, posts]);

  useEffect(() => {    
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const breakpoints: number[] = Object.keys(columnsBreakpoints)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map((b) => parseInt(b));
      
      for (let i = 0; i < breakpoints.length; i++) {
        const breakpoint = breakpoints[i] as number;
        if (screenWidth < breakpoint) {
          setColumns(columnsBreakpoints[breakpoint] || 5);
          break;
        }
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex gap-4">
      {dividedPosts.map((posts, i) => {
        return <CardsColumn key={i} posts={posts} />;
      })}
    </div>
  );
};

export default CardColumnsContainer;
