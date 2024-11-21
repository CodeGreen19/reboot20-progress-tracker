import Image from "next/image";
import Link from "next/link";
import React from "react";

import { GoGoal } from "react-icons/go";
import StaticGoal from "../goals-this-year/StaticGoal";
import { FaPray } from "react-icons/fa";
import PrayStaistics from "../pray/PrayStatistics";
import { getUserIdFromCookie } from "@/server/data/data";

const LogoNav = () => {
  const { id } = getUserIdFromCookie();
  console.log(id);

  return (
    <div className="flex_center sticky left-0 top-0 z-50 h-20 w-full justify-between rounded-bl-3xl rounded-br-3xl border-b bg-nav px-3 md:px-6">
      <div className="flex items-end">
        <Link href={"/"}>
          <Image height={40} width={200} alt="logo" src={"/logo.png"} />
        </Link>
      </div>
      <div className="flex justify-center gap-1">
        {id === process.env.ADMIN_ID && (
          <>
            <StaticGoal>
              <div className="flex items-center gap-2 rounded-3xl bg-black p-1 px-3 text-sm">
                <div className="py-1">
                  <GoGoal className="text-yellow-500" />
                </div>
                <span className="hidden sm:block">Goals</span>
              </div>
            </StaticGoal>
            <PrayStaistics>
              <div className="flex items-center gap-2 rounded-3xl bg-black p-1 px-3 text-sm">
                <div className="py-1">
                  <FaPray className="text-green-500" />
                </div>
                <span className="hidden sm:block">Pray</span>
              </div>
            </PrayStaistics>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoNav;
