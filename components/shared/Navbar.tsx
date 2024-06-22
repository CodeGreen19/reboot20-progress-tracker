"use client";

import React, { Fragment } from "react";
import { RiHome5Line } from "react-icons/ri";

import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SwitchForm from "../auth/SwitchForm";
import { AUTH_ROUTE } from "@/routes";

const Navbar = () => {
  const pathname = usePathname();
  let icons = [
    { icon: <RiHome5Line />, url: "/" },
    { icon: <BsBarChartFill />, url: "/charts" },
    { icon: <IoIosAddCircleOutline className="text-[1.5rem]" />, url: "/add" },
    {
      icon: <MdOutlineAccountCircle className="text-[1.5rem]" />,
      url: "/profile",
    },
  ];

  return (
    <div>
      {AUTH_ROUTE.includes(pathname) ? (
        <SwitchForm pathname={pathname} />
      ) : (
        <ul className="fixed bottom-0 flex h-16 w-full max-w-xl items-center justify-around rounded-tl-3xl rounded-tr-3xl border-t bg-nav">
          {icons.map((info) => (
            <Link key={info.url} href={info.url}>
              <li className="text-xl text-white">{info.icon}</li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
