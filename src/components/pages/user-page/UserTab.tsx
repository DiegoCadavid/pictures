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
      className={
        isActive
          ? "border-b-2 border-b-red-400  py-2 font-bold capitalize text-red-500"
          : "py-2  capitalize"
      }
    >
      {children}
    </Link>
  );
};

export default UserTab;
