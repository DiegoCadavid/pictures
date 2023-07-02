import { type Session } from "next-auth";
import Follow from "@/components/follow/Follow";
import Link from "next/link";

interface Props {
  userName: string;
  userImage?: string;
  userId: string;
  description: string;
  title: string;
  followers: number | null;
}

const PostInfo = ({
  userName,
  userImage,
  description,
  title,
  userId,
  followers,
}: Props) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Link className="shrink-0" href={`/user/${userName}`}>
          <img
            src={userImage || "/user_icon.png"}
            alt="user icon"
            className="h-16 w-16 rounded-full object-cover "
          />
        </Link>
        <div className="flex gap-4 justify-between w-full md:justify-start">
          <div className="leading-tight">
            <Link
              className="text-lg font-semibold hover:underline"
              href={`/user/${userName}`}
            >
              @{userName}
            </Link>
            {
              <p>
                {" "}
                {followers !== null ? `${followers} Followers` : "Loading..."}
              </p>
            }
          </div>
          <Follow userId={userId} />
        </div>
      </div>

      <h2 className="mt-4 text-2xl font-semibold">{title}</h2>
      <p className="mt-1">{description}</p>
    </>
  );
};

export default PostInfo;
