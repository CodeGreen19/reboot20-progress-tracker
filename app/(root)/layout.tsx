import LogoNav from "@/components/shared/LogoNav";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";

const HomeLayout = ({ children }: { children: ReactNode }) => {
  let auth = false;
  return (
    <div>
      {auth && <LogoNav />}
      {children}
      {auth && <Navbar />}
    </div>
  );
};

export default HomeLayout;
