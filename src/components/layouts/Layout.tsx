import { Noto_Sans } from "next/font/google";
import Navbar from "../ui/navbar/Navbar";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["700", "400"],
  style: ["normal", "italic"],
});

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={`${notoSans.className} relative`} >
      {/* Navbar */}
      <Navbar />
      {/* Body */}
      <div className="min-h-[calc(100vh-73px)] bg-zinc-100 -z-50">{children}</div>
    </div>
  );
};

export default Layout;
