import Image from "next/image";
import React from "react";

const LogoNav = () => {
  return (
    <div className="flex_center bg-nav h-20 w-full rounded-bl-3xl rounded-br-3xl border-b">
      <div>
        <Image height={40} width={200} alt="logo" src={"/logo.png"} />
      </div>
    </div>
  );
};

export default LogoNav;
