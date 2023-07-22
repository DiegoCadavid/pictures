import { createContext } from "react";
import { type PostImage } from "@/types";

interface PostContext {
  imageSelected : PostImage | null,
  id: string | null;
  handleImageSelect: (id: string, image: PostImage, ) => void
}

const postContext = createContext<PostContext | null>(null);

export default postContext;