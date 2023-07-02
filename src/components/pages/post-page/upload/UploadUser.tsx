import { api } from "@/utils/api";

interface Props {
  image: string | null;
  name: string;
  id: string;
}

const UploadUser = ({ name, image, id }: Props) => {

   const userFollowsCount = api.user.followsCountsByUserId.useQuery(id);


  return (
    <div className="mb-4 flex items-center gap-4">
      <img
        src={image ? image : "/user_icon.png"}
        alt="user icon"
        className="avatar"
      />
      <div className="leading-tight">
        <p className="text-lg font-semibold">@{name}</p>
        { userFollowsCount.isSuccess && <p>{userFollowsCount.data?._count.followers} Followers</p>}
      </div>
    </div>
  );
};

export default UploadUser;
