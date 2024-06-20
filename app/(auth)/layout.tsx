import Navbar from "@/components/shared/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-xl">
      {children}
      <Navbar />
    </div>
  );
};

export default layout;
