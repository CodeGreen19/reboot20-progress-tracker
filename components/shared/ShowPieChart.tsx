// components/ChartComponent.tsx
import React from "react";

import { GoalType } from "@/server/schema";
import { TaskWithCompletedPercent } from "../statistics";

const ShowPieChart = ({ data }: { data: GoalType }) => {
  let info = TaskWithCompletedPercent(data);

  return (
    <div className="w-full">
      <ul className="p-6">
        {info.map((text, i) => (
          <li
            key={i}
            className={`my-3 flex items-center justify-between text-sm ${text.num < 50 ? "text-red-600" : text.num < 90 ? "text-amber-500" : "text-green-500"}`}
          >
            <h1 className="pr-3">
              {i + 1}. {text.text}
            </h1>
            <span>{text.num}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowPieChart;
