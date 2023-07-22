import { useState } from "react";

import postContext from "@/contexts/postContext";
import { type PostImage } from "@/types";

interface Props {
  children: React.ReactNode;
}

const PostContextProvider = ({ children }: Props) => {
  const [postImageSelected, setPostImageSelected] = useState<PostImage | null>(
    null
  );
  const [postId, setPostId] = useState<string | null>(null);

  return (
    <postContext.Provider
      value={{
        handleImageSelect(id, image) {
          setPostImageSelected(image);
          setPostId(id);
        },
        imageSelected: postImageSelected,
        id: postId,
      }}
    >
      {children}
    </postContext.Provider>
  );
};

export default PostContextProvider;
