interface Props {
  image: string | null;
  name: string;
}

const UploadUser = ({ name, image }: Props) => {
  return (
    <div className="mb-4 flex items-center gap-4">
      <img
        src={image ? image : "/user_icon.png"}
        alt="user icon"
        className="avatar"
      />
      <div className="leading-tight">
        <p className="text-lg font-semibold">@{name}</p>
        <p>13k Followers</p>
      </div>
    </div>
  );
};

export default UploadUser;
