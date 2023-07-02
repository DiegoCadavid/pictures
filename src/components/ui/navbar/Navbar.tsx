import { useSession } from "next-auth/react";

import Image from "next/image";

import NavLink from "./NavLink";
import NavSearchBar from "./NavSearchBar";
import NavUser from "./NavUser";
import Link from "next/link";
import NavbarMobile from "./NavbarMobile";

const Navbar = ({}) => {
  const { status, data: session } = useSession();

  return (
    <div className="border-b border-zinc-300 bg-white py-3 sticky md:static top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <Link href="/">
        <h1 className="text-xl  font-bold text-red-500">Pictures</h1>
        </Link>
        

        {/* Nav */}
        <nav className=" hidden md:flex gap-1.5 ">
          <NavLink href="/">Home</NavLink>
          { status === "authenticated" && <NavLink href="/post/upload">Upload</NavLink>}
        </nav>

        

        <div className="hidden md:block flex-1">

          <NavSearchBar />
        </div>
        

        {/* <div className="block md:hidden flex-1">
          <NavbarMobile />
        </div> */}

        <NavUser status={status} session={session} />
      </div>
    </div>
  );
};

export default Navbar;
