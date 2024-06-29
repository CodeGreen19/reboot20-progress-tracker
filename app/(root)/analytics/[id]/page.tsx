"use client";
import AnalyticsInfo from "@/components/analytics/AnalyticsInfo";
import CircularProgressBar from "@/components/shared/CircularProgress";
import LineChart from "@/components/shared/LineChart";
import ShowPieChart from "@/components/shared/ShowPieChart";
import Skeleton from "@/components/shared/Skeleton";
import useSingleGoal from "@/hooks/useSingleGoal";
import { FiCornerDownRight } from "react-icons/fi";

import React, { Fragment } from "react";
import { RiFingerprintLine } from "react-icons/ri";

const DynamicAnalytics = ({ params }: { params: { id: string } }) => {
  const { data, isPending } = useSingleGoal(params.id);
  return (
    <Fragment>
      {isPending ? (
        <Skeleton count={5} />
      ) : (
        <div className="mb-24 px-2">
          <AnalyticsInfo data={data?.singleGoal!} />
          <div className="my-3">
            <LineChart data={data?.singleGoal!} />
            <h1 className="flex_center my-2 text-center text-sm font-bold text-blue-400">
              <FiCornerDownRight className="mr-2" /> The progress of each day
            </h1>
          </div>
          <div className="my-3 rounded-md bg-[#1f1f1f] py-4">
            <ShowPieChart data={data?.singleGoal!} />
            <h1 className="flex_center my-2 text-center text-sm font-bold text-blue-400">
              <FiCornerDownRight className="mr-2" /> The progress of each Task
            </h1>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DynamicAnalytics;
