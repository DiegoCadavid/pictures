import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Props {
  bookmarks: string | null;
  postId: string;
}

const Bookmark = ({ bookmarks: bookmarksData, postId }: Props) => {
  const { status, data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<boolean | null>(null);
  // Mutations
  const bookmark = api.post.bookmark.useMutation();
  const unBookmark = api.post.unBookmark.useMutation();

  useEffect(() => {
    if(status === "authenticated" && bookmarks === null ) {
      setBookmarks(bookmarksData === session.user.id);
    }
    
  }, [status])
  

  
  if (status != "authenticated" || bookmarks === null) {
    return null;
  }

  if (bookmarks) {
    return (
      <button
        disabled={bookmark.isLoading || unBookmark.isLoading}
        onClick={() => {
          unBookmark.mutate(postId);
          setBookmarks(false)
        }}
        className="btn-icon btn-muted pointer-events-auto flex-shrink-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path d="M3.53 2.47a.75.75 0 00-1.06 1.06l18 18a.75.75 0 101.06-1.06l-18-18zM20.25 5.507v11.561L5.853 2.671c.15-.043.306-.075.467-.094a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93zM3.75 21V6.932l14.063 14.063L12 18.088l-7.165 3.583A.75.75 0 013.75 21z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      disabled={bookmark.isLoading || unBookmark.isLoading}
      onClick={() => {
        bookmark.mutate(postId);
        setBookmarks(true)
      }}
      className="btn-icon btn-primary pointer-events-auto flex-shrink-0"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6 text-white"
      >
        <path
          fillRule="evenodd"
          d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default Bookmark;
