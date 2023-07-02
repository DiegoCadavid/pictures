import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
  href: string;
}

const UserTab = ({ children, href }: Props) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link
      href={href}
      className={`py-2 capitalize  ${
        isActive ? "border-b-2 border-b-b-2 border-b-red-400 font-bold  text-red-500": ""
      }`}
    >
      {children}
    </Link>
  );
};

export default UserTab;
