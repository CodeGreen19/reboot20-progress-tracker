"use client";

import { Button } from "@/components/ui/button";
import { UrineChart } from "@/components/urine/UrineChart";
import { ArrowRightIcon, Expand } from "lucide-react";
import React, { Fragment } from "react";
import { FaArrowRight, FaExpand } from "react-icons/fa6";
import UrineDayInfo from "./UrineDayInfo";
import { useQuery } from "@tanstack/react-query";
import { getUrineInfo } from "@/server/actions/urine.action";
import Skeleton from "@/components/shared/Skeleton";
import { format } from "date-fns";

const AnalyticsPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["urineInfo"],
    queryFn: async () => await getUrineInfo(),
  });
  if (error) {
    return <div>Error occurs</div>;
  }

  return (
    <Fragment>
      {isPending ? (
        <Skeleton count={4} />
      ) : data && data.info && data.info?.length < 1 ? (
        <div className="my-3 text-center">Nothing to show !</div>
      ) : (
        <div className="p-2 pb-28">
          <div className="">{data && <UrineChart data={data.info!} />}</div>
          <div className="mt-2 space-y-2">
            {data &&
              data?.info
                ?.slice()
                .reverse()
                .map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[2.5fr_1fr_0.8fr] gap-1"
                  >
                    <Button className="truncate">
                      {format(item.createdAt, "dd MMM, EEEE")}
                    </Button>
                    <Button
                      className={`${item.times.length < 6 ? "bg-green-500" : item.times.length < 10 ? "bg-amber-500" : "bg-red-500"}`}
                    >
                      {item.times.length} times
                    </Button>
                    <Button>
                      <UrineDayInfo data={item}>
                        <FaExpand className="ml-2 text-sm" />
                      </UrineDayInfo>
                    </Button>
                  </div>
                ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AnalyticsPage;
