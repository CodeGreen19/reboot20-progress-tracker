import LogoNav from "@/components/shared/LogoNav";
import React, { ReactNode } from "react";

const TaskLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <LogoNav />
      {children}
    </div>
  );
};

export default TaskLayout;
