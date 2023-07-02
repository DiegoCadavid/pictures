import { signIn } from "next-auth/react";

import NavButton from "./NavButton";
import NavUserIcon from "./NavUserIcon";
import { type Session } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import NavLink from "./NavLink";

interface Props {
  status: "loading" | "authenticated" | "unauthenticated";
  session: Session | null;
}

const NavUser = ({ status, session }: Props) => {
  if (status === "loading") {
    return (
      <div className="flex rounded-2xl border border-zinc-400 bg-zinc-200 px-6 py-3">
        Loading...
      </div>
    );
  }

  if (status == "unauthenticated" || session == null) {
    return (
      <button
        className="btn flex items-center justify-center gap-2 rounded-2xl border bg-[#5865F2] text-white"
        onClick={() => {
          signIn("discord")
            .then(() => console.log("signed in"))
            .catch(() => {
              console.log("error");
            });
        }}
      >
        Login
        <Image
          src="/discord_white.svg"
          width={20}
          height={20}
          alt="discord logo"
        />
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href={"/search"}
        className="btn-icon  btn-secondary flex flex-1 md:hidden"
      >
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
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </Link>
      <Link
        href={"/post/upload"}
        className="btn-icon  btn-secondary flex flex-1 md:hidden"
      >
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
      </Link>

      <Link
        href={
          session?.user?.name ? `/user/${session?.user?.name}/bookmarks` : ""
        }
        className="btn-icon  btn-secondary  flex flex-1"
      >
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
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
          />
        </svg>
      </Link>

      <NavButton>
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
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </NavButton>

      {session?.user.id && (
        <NavUserIcon
          id={session.user.id}
          image={session?.user?.image || "/user_icon.png"}
          name={session?.user?.name || "No name?"}
        />
      )}
    </div>
  );
};

export default NavUser;
