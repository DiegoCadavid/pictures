import Image from "next/image";
import NavUserDropdown from "./NavUserDropdown";
import { useState } from "react";
import { api } from "@/utils/api";

interface Props {
  image: string;
  name: string;
  id: string;
}

const NavUserIcon = ({ image, name, id }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const userFollowsCounts = api.user.followsCountsByUserId.useQuery(id);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative h-12 w-12 rounded-full ">
      <button
        onClick={() => {
          setIsDropdownOpen(!isDropdownOpen);
        }}
      >
        <Image
          src={image || "/user_icon.png"}
          alt="User icon"
          className="h-full w-full rounded-full ring-red-500 ring-offset-2 hover:ring-2"
          width={48}
          height={48}
        />
      </button>

      {isDropdownOpen && (
        <NavUserDropdown
          image={image}
          name={name}
          followers={
            userFollowsCounts.status === "success"
              ? userFollowsCounts.data?._count.followers || 0
              : null
          }
          closeDropdown={closeDropdown}
        />
      )}
    </div>
  );
};

export default NavUserIcon;
