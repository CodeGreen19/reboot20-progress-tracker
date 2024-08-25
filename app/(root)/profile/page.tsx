"use client";
import CommitMents from "@/components/commits/CommitMents";
import Skeleton from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import { getUser, logoutUser } from "@/server/actions/user.action";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
          <ul className="mx-3 mt-2 rounded-xl border bg-[#161616] p-2 shadow-sm">
            <li className="my-2 grid grid-cols-[1.2fr_2fr]">
              <span>Full Name</span>
              <span>: {data.name}</span>
            </li>
            <li className="my-2 grid grid-cols-[1.2fr_2fr]">
              <span>Email Address</span>
              <span>
                {" "}
                :
                {data.email?.length! > 20
                  ? ` ${data.email?.slice(0, 20)}....`
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
              <div
                className="mr-5 text-red-600"
                onClick={() => {
                  logoutUser();
                  router.push("/");
                  router.refresh();
                }}
              >
                Logout
              </div>
            </li>
          </ul>
          <div className="mb-20">
            <div className="my-4 flex">
              <div
                className="w-full cursor-pointer text-center text-blue-500 underline"
                onClick={() => router.push(`/profile/create-commit/${data.id}`)}
              >
                create new commitment
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
                    isDone={item.isCompleted}
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
