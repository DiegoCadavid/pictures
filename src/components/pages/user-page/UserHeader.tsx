import { type Session } from "next-auth";
import Follow from "@/components/follow/Follow";
import { api } from "@/utils/api";

interface Props {
  userImage?: string;
  userName?: string;
  userBio?: string;
  userId: string;

  session: Session | null;
  sessionStatus: "authenticated" | "loading" | "unauthenticated";
}

const UserHeader = ({ userImage, userName, userId, userBio }: Props) => {
  const userFollowsCount = api.user.followsCountsByUserId.useQuery(userId);

  return (
    <div className="bg-zinc-200 py-6">
      <div className="container relative mx-auto flex items-center gap-8">
        <img
          src={userImage || "/user_icon.png"}
          alt="user image"
          className="h-32 w-32 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold ">
            {userName ? `@${userName}` : "User"}
          </h1>
          {userBio && <p>{userBio}</p>}
          {userFollowsCount.isSuccess && userFollowsCount.data && (
            <div className="mt-2 flex gap-4">
              <p>
                <span className="font-semibold">
                  {userFollowsCount.data?._count.followers}
                </span>{" "}
                followers
              </p>
              <p>
                <span className="font-semibold">
                  {userFollowsCount.data?._count.followings}
                </span>{" "}
                followings
              </p>
            </div>
          )}

          {userFollowsCount.isLoading && (
            <div className="mt-2 flex gap-4">
              <p>Loading</p>
            </div>
          )}
        </div>

        {userName && userId && (
          <div className="absolute -bottom-12 right-0">
            <Follow userId={userId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
