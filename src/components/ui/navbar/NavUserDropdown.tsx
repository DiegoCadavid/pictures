import Link from "next/link";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface Props {
  name: string;
  image: string;
  followers: number | null;
  closeDropdown: () => void;
}

const NavUserDropdown = ({ image, name, followers, closeDropdown }: Props) => {
  return (
    <div
      onMouseLeave={() => {
        closeDropdown();
      }}
      className="absolute right-0 top-full mt-2 min-w-[250px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow z-30"
    >
      <Link href={`/user/${name}`} className="flex items-center gap-2 p-4 group">
        <Image
          src={image || "/user_icon.png"}
          alt="User icon"
          className="h-12 w-12 rounded-full"
          width={48}
          height={48}
        />
        <div className="leading-tight">
          <p className="text-lg font-semibold group-hover:underline ">@{name}</p>
          <p>{followers} Followers</p>
        </div>
      </Link>
      <div className="flex items-center justify-center bg-zinc-100 p-4">
        <button onClick={() => {
          signOut().then((data) => {
            console.log(data);
          }).catch((err) => {
            console.log(err);
          })
          }}  className="flex gap-1 text-zinc-800 hover:text-red-900  ">
          Logout
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default NavUserDropdown;
