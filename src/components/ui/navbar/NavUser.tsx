import { signIn } from "next-auth/react";

import NavButton from "./NavButton";
import NavUserIcon from "./NavUserIcon";
import { type Session } from "next-auth";
import Link from "next/link";

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
        className="flex rounded-2xl border bg-[#5865F2] px-6  py-3 text-white"
        onClick={() => {
          signIn("discord")
            .then(() => console.log("signed in"))
            .catch(() => {
              console.log("error");
            });
        }}
      >
        Login with Discord
      </button>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Link 
        href={ session?.user?.name ?  `/user/${session?.user?.name}/bookmarks` : ""}
        className="btn-icon  btn-secondary flex-1"
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
