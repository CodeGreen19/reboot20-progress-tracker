import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoNav = () => {
  return (
    <div className="flex_center sticky left-0 top-0 z-50 h-20 w-full rounded-bl-3xl rounded-br-3xl border-b bg-nav">
      <div>
        <Link href={"/"}>
          <Image height={40} width={200} alt="logo" src={"/logo.png"} />
        </Link>
      </div>
    </div>
  );
};

export default LogoNav;
