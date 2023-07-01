import { api } from "@/utils/api";
import CardColumnsContainer from "@/components/cards-column/CardColumnsContainer";
import { useSession } from "next-auth/react";

interface Props {
  userName: string;
}

const UserBookmarks = ({ userName }: Props) => {
  const postsQuery = api.post.getByUserNameBookmarks.useQuery(userName);
  const { status, data: session } = useSession();

  if (postsQuery.isLoading || !postsQuery.data || status == "loading") {
    return <p className="mt-4 text-center italic text-zinc-500">Loading...</p>;
  }

  return (
    <CardColumnsContainer
      posts={postsQuery.data.map((post) => {
        return {
          ...post,
          bookmarks: session?.user.name == userName ? session.user.id : null,
        };
      })}
    />
  );
};

export default UserBookmarks;
