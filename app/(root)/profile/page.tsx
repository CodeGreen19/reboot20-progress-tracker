"use client";
import CommitMents from "@/components/commits/CommitMents";
import Skeleton from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import { getUser, logoutUser } from "@/server/actions/user.action";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa6";

let userInfo = async () => {
  let user = await getUser();
  return user;
};

const ProfilePage = () => {
  const router = useRouter();

  const { data, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: userInfo,
  });

  return (
    <div className="w-full rounded-xl text-sm">
      {isPending && <Skeleton count={2} />}
      {!isPending && data && "id" in data && (
        <div>
          <ul className="mx-3 mt-2 rounded-xl border bg-[#161616] p-2 px-4 shadow-sm">
            <li className="my-2 grid grid-cols-[1.2fr_2fr]">
              <span>Full Name</span>
              <span>: {data.name}</span>
            </li>
            <li className="my-2 grid grid-cols-[1.2fr_2fr]">
              <span>Email Address</span>
              <span className="truncate">
                {" "}
                :
                {data.email?.length! > 20
                  ? ` ${data.email.toString()}`
                  : data.email}
              </span>
            </li>
            <li className="my-2 grid grid-cols-[1.2fr_2fr]">
              <span>Member Since</span>
              <span>
                {" "}
                : {new Date(data.createdAt).toUTCString().slice(0, 11)}
              </span>
            </li>
            <li className="my-2 grid grid-cols-[1.2fr_2fr]">
              <span></span>
              <Button
                className="my-0 flex w-20 rounded-3xl bg-neutral-800 py-1 text-center text-red-600"
                onClick={() => {
                  logoutUser();
                  router.push("/");
                  router.refresh();
                }}
              >
                Logout
              </Button>
            </li>
          </ul>
          <div className="mb-20">
            <div className="my-4 flex w-full items-center justify-between px-6">
              <div>Commitments({data.commitments.length})</div>
              <div
                className="flex cursor-pointer items-center gap-1 text-center text-blue-500"
                onClick={() => router.push(`/profile/create-commit/${data.id}`)}
              >
                create new commitment <FaArrowRight className="ml-2 text-xs" />
              </div>
            </div>
            {data.commitments.length === 0 ? (
              <div className="mt-11 w-full text-center">
                no commitment created yet !
              </div>
            ) : (
              data.commitments.map((item) => (
                <div key={item.id} className="px-3">
                  <CommitMents
                    date={item.createdAt}
                    text={item.text}
                    isCompleted={item.isCompleted}
                    isFailed={item.isFailed}
                    commitId={item.id}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
