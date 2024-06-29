"use client";
import Skeleton from "@/components/shared/Skeleton";
import { Button } from "@/components/ui/button";
import { getUser, logoutUser } from "@/server/actions/user.action";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
    <div className="w-full p-4">
      {isPending && <Skeleton count={2} />}
      {!isPending && data && "id" in data && (
        <ul className="mx-3 rounded-xl bg-[#161616] p-3 shadow-sm">
          <li className="my-2 grid grid-cols-2">
            <span>Full Name</span>
            <span>{data.name}</span>
          </li>
          <li className="my-2 grid grid-cols-2">
            <span>Email Address</span>
            <span>
              {data.email?.length! > 15
                ? ` ${data.email?.slice(0, 15)}....`
                : data.email}
            </span>
          </li>
          <li className="my-2 grid grid-cols-2">
            <span>Member Since</span>
            <span>{new Date(data.createdAt).toUTCString().slice(0, 11)}</span>
          </li>
          <li className="my-2 grid grid-cols-2">
            <span></span>
            <Button
              className="mr-5 bg-black text-red-600"
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
