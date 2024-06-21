import LogoNav from "@/components/shared/LogoNav";
import Navbar from "@/components/shared/Navbar";
import { authUser } from "@/server/actions/user.action";
import { ReactNode } from "react";

const HomeLayout = async ({ children }: { children: ReactNode }) => {
  let auth = await authUser();

  return (
    <div>
      {auth && <LogoNav />}
      {children}
      {auth && <Navbar />}
    </div>
  );
};

export default HomeLayout;
