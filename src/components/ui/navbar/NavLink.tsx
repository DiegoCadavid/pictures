import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  href: string;
  children: string;
}

const NavLink = ({href, children}: Props) => {

  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href} className={`btn  ${ isActive ? "btn-muted" : "btn-secondary"}`}>
      {children}
    </Link>
  )
}

export default NavLink