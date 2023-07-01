

import { useSession } from "next-auth/react";
import NavLink from "./NavLink";
import NavSearchBar from "./NavSearchBar";
import NavUser from "./NavUser";

const Navbar = ({}) => {
  const { status, data: session } = useSession();

  return (
    <div className="border-b border-zinc-300 py-3 bg-white">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <h1 className="text-xl font-bold text-red-500">Pictures</h1>

        {/* Nav */}
        <nav className="flex gap-1.5">
          <NavLink href="/">Home</NavLink>
          { <NavLink href="/post/upload">Upload</NavLink>}
        </nav>

        {/* Search bar */}
        <NavSearchBar />

        {/* User actions */}
        <NavUser status={status} session={session} />
      </div>
    </div>
  );
};

export default Navbar;
