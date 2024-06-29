import React from "react";
import CircularProgressBar from "../shared/CircularProgress";
import { GoGoal } from "react-icons/go";
import { LuArrowUpWideNarrow } from "react-icons/lu";
import { AiOutlineFileDone } from "react-icons/ai";
import { GoalType } from "@/server/schema";
import {
  AvarageGoalLength,
  AverageSuccessOfAllGoal,
  ShowLargestSuccessOfGoal,
} from "../statistics";

const ShowOverallResult = ({ data }: { data: GoalType[] }) => {
  return (
    <div className="rounded-lg bg-[#1a1a1a] py-4">
      <div className="flex items-center justify-center gap-4">
        <div className="my-4 w-1/3">
          <CircularProgressBar value={AverageSuccessOfAllGoal(data)} />
        </div>
        <ul className="flex flex-col items-start justify-start gap-1 text-sm text-blue-500">
          <li className="flex_center gap-2">
            <GoGoal className="text-lg text-purple-500" /> Goal Count :{" "}
            {data.length}
          </li>
          <li className="flex_center gap-2">
            <LuArrowUpWideNarrow className="text-lg text-red-500" /> Average day
            length : {AvarageGoalLength(data)}
          </li>
          <li className="flex_center gap-2">
            <AiOutlineFileDone className="text-lg text-yellow-500" /> Highest
            Completed Goal no : {ShowLargestSuccessOfGoal(data)} %
          </li>
        </ul>
      </div>
      <h1 className="text-center text-sm font-bold">Overall Success</h1>
    </div>
  );
};

export default ShowOverallResult;
