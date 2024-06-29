"use client";

import { useQuery } from "@tanstack/react-query";
import { AllGoals } from "../query";
import Skeleton from "../shared/Skeleton";
import CompletedTaskCard from "./CompletedTaskCard";
import Link from "next/link";
import { Button } from "../ui/button";

const HomePage = () => {
  const { data, isPending } = useQuery({
    queryKey: ["goals"],
    queryFn: AllGoals,
  });

  if (!data) {
    return <Skeleton count={5} />;
  }

  if ("error" in data) {
    return <div>error occurs</div>;
  }

  return (
    <div className="mb-20">
      <div className="flex flex-col-reverse items-center justify-between gap-1 p-3">
        {isPending ? (
          <Skeleton count={5} />
        ) : data.users?.goals.length! > 0 ? (
          data.users?.goals.map((goal, i) => (
            <CompletedTaskCard key={i} goal={goal} />
          ))
        ) : (
          <>
            <Link href={"/add"}>
              <Button className="bg-blue-700">create one</Button>
            </Link>
            <div className="mt-5">{"you haven't created any goal yet !"} </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
