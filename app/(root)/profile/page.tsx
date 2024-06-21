"use client";
import { Button } from "@/components/ui/button";
import { getUser, logoutUser } from "@/server/actions/user.action";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

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
  console.log(data);

  return (
    <div className="w-full">
      {isPending && (
        <div className="flex_center mt-5 w-full animate-pulse text-white">
          loading...
        </div>
      )}
      {!isPending && data && "id" in data && (
        <ul className="mx-3 mt-10 rounded-md bg-[#1a1a1a] p-3 shadow-lg">
          <li className="my-2 grid grid-cols-2">
            <span>name</span>
            <span>{data.name}</span>
          </li>
          <li className="my-2 grid grid-cols-2">
            <span>email</span>
            <span>
              {data.email?.length! > 15
                ? ` ${data.email?.slice(0, 15)}....`
                : data.email}
            </span>
          </li>
          <li className="my-2 grid grid-cols-2">
            <span>member</span>
            <span>{new Date(data.createdAt).toUTCString().slice(0, 11)}</span>
          </li>
          <li className="my-2 grid grid-cols-2">
            <span>.....</span>
            <Button
              className="mr-5 bg-red-600 text-white"
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
      )}
    </div>
  );
};

export default ProfilePage;
