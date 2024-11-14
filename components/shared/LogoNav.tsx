import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import AddUrin from "../root/AddUrine";

const LogoNav = () => {
  return (
    <div className="flex_center sticky left-0 top-0 z-50 h-20 w-full justify-between rounded-bl-3xl rounded-br-3xl border-b bg-nav px-5 md:px-6">
      <div>
        <Link href={"/"}>
          <Image height={40} width={200} alt="logo" src={"/logo.png"} />
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default LogoNav;
