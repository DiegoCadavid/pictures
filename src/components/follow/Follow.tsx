import { api } from "@/utils/api";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Props {
  userId: string;
}

const Follow = ({ userId }: Props) => {
  const { status, data: session } = useSession();
  const IsFollowingQuery = api.user.isFollowing.useQuery(userId);
  const followUser = api.user.follow.useMutation();
  const unfollowUser = api.user.unfollow.useMutation();

  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    // Set first value
    if(isFollowing === null && IsFollowingQuery.status == "success") {
      setIsFollowing(!!IsFollowingQuery.data);
    } 
  }, [IsFollowingQuery.status])

  

  if (status == "loading" || IsFollowingQuery.status == "loading") {
    return;
  }

  if (session?.user.id == userId) {
    return;
  }

  // Verify if a user authenticated
  if (status == "unauthenticated") {
    return;
  }

  // Verify if a user is already following
  if (isFollowing) {
    return (
      <button
        disabled={
          unfollowUser.isLoading ||
          followUser.isLoading 
        }
        onClick={(): void => {
          unfollowUser.mutate(userId);
          setIsFollowing(false);
        }}
        className="btn btn-muted"
      >
        Unfollow
      </button>
    );
  }

  return (
    <button
      disabled={
        followUser.isLoading || unfollowUser.isLoading
      }
      onClick={(): void => {
        followUser.mutate(userId);
        setIsFollowing(true);
      }}
      className="btn btn-primary"
    >
      follow
    </button>
  );
};

export default Follow;
