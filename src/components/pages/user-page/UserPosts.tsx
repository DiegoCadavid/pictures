import { api } from "@/utils/api";
import CardColumnsContainer from "@/components/cards-column/CardColumnsContainer";

interface Props {
  userName: string;
}

const UserPosts = ({ userName }: Props) => {
  const postsQuery = api.post.getByUserName.useQuery(userName);

  if (postsQuery.isLoading || !postsQuery.data) {
    return <p className="mt-4 text-center italic text-zinc-500">Loading...</p>;
  }

  return <CardColumnsContainer posts={postsQuery.data} />;
};

export default UserPosts;
