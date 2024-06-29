import React from "react";
import CircularProgressBar from "../shared/CircularProgress";
import { GoalType } from "@/server/schema";
import FormatDate from "../shared/FormatDate";
import { dateDifference } from "../data";
import { overallSuccessOfGoal } from "../statistics";

const AnalyticsInfo = ({ data }: { data: GoalType }) => {
  let value = overallSuccessOfGoal(data);
  return (
    <div className="rounded-lg bg-[#121212] p-3">
      <h1 className="text-center font-bold">Goal: {data.goal}</h1>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm">
            {" "}
            Date: {FormatDate(data.fromDate)} to {FormatDate(data.toDate)}
          </h2>
          <h2>
            Day length:{" "}
            {`${dateDifference(data.fromDate, data.toDate).length} days`}
          </h2>
          <h2>Each Day : {data.tasks![0].dayTasks?.length} tasks</h2>
          <h2 className="text-sm">Status : {data.status}</h2>
        </div>
        <div className="w-1/4">
          <CircularProgressBar value={value} />
          <h1 className="mt-2 text-center text-[10px] text-blue-500">
            Overall Success
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsInfo;
