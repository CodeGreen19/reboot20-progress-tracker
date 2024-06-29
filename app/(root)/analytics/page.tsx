"use client";

import ShowOverallResult from "@/components/analytics/ShowOverallResult";
import { AllGoalsWithOtherInfo } from "@/components/query";
import Skeleton from "@/components/shared/Skeleton";
import TextSmaller from "@/components/shared/TextSmaller";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Fragment } from "react";

const AnalyticsPage = () => {
  const { isPending, data } = useQuery({
    queryKey: ["allGoalsWithInfo"],
    queryFn: AllGoalsWithOtherInfo,
  });

  return (
    <Fragment>
      {isPending ? (
        <Skeleton count={5} />
      ) : (
        <Fragment>
          <div className="w-full p-3">
            <ShowOverallResult data={data?.goals?.goals!} />
          </div>
          <div className="mt-3 text-center">
            <h1 className="text-sm text-[#8e8e8e] underline">
              View Single Goal Analytics
            </h1>

            <ul className="m-auto mb-24 mt-4 w-5/6">
              {data?.goals?.goals.map((goal) => {
                if (goal.status === "completed") {
                  return (
                    <Link key={goal.id} href={`/analytics/${goal.id}`}>
                      <li className="m-auto my-1 flex items-center justify-between rounded-lg bg-[#101010] p-3">
                        <span>
                          Goal: <TextSmaller text={goal.goal} count={50} />
                        </span>
                        <Button className="bg-green-700">view</Button>
                      </li>
                    </Link>
                  );
                }
              })}
            </ul>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AnalyticsPage;
