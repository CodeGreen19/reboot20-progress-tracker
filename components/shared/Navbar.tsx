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
import { PiNotePencilFill } from "react-icons/pi";

const Navbar = () => {
  const pathname = usePathname();
  let icons = [
    { icon: <RiHome5Line />, url: "/" },
    { icon: <BsBarChartFill />, url: "/analytics" },
    { icon: <IoIosAddCircleOutline className="text-[1.5rem]" />, url: "/add" },
    {
      icon: <PiNotePencilFill className="text-[1.5rem]" />,
      url: "/diary",
    },
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
        <ul className="bottom_nav">
          {icons.map((info) => (
            <Link key={info.url} href={info.url}>
              <li
                className={`text-xl text-white ${pathname === info.url ? "!text-blue-600" : ""}`}
              >
                {info.icon}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Navbar;
