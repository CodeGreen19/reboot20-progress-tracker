import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ShowDays from "./ShowDays";
import { GoalType } from "@/server/schema";
import FormatDate from "../shared/FormatDate";
import { useTaskStore } from "@/hooks/useStore";
import { ShowProgressInPercent, timeLeft } from "../statistics";

const TaskInfo = ({ data }: { data: GoalType }) => {
  const [showDays, setShowDays] = useState<boolean>(false);
  let { taskCount, setTaskCount, setExistDayTasks, setDone } = useTaskStore();

  const changeDate = (taskIndex: number) => {
    setTaskCount(taskIndex);
    if (data.tasks) {
      setExistDayTasks(data.tasks[taskIndex]!.dayTasks!);
    }
    setDone(false);
  };

  // it is selecting today
  useEffect(() => {
    let arr = data.tasks?.filter(
      (exist) =>
        JSON.stringify(FormatDate(exist.date)) ===
        JSON.stringify(FormatDate(new Date())),
    );

    if (arr?.length! > 0) {
      let index = data.tasks?.indexOf(arr![0]);
      setTaskCount(index!);
    }
  }, [data.tasks, setTaskCount]);

  return (
    <div className="rounded-xl bg-[#151515] p-2 text-center">
      <p className="mt-3 text-sm text-gray-200">
        <span> Goal : </span>
        {data.goal}
      </p>
      <h1 className="my-2 text-lg font-bold">
        {FormatDate(data.fromDate)} <span> to</span> {FormatDate(data.toDate)}
      </h1>
      <h1>Left : {timeLeft(data.toDate)}</h1>
      <div className="flex items-center justify-between px-7 pt-2">
        <h1 className="text-sm">
          Today Completed :{" "}
          {data && ShowProgressInPercent(data.tasks![taskCount].dayTasks!)}%
        </h1>
        <ShowDays show={showDays} setShow={setShowDays} />
      </div>
      {showDays && (
        <ul className="m-4 flex flex-wrap items-start justify-start gap-2">
          {data.tasks!.map((task, i) => (
            <li
              key={i}
              onClick={() => changeDate(i)}
              className={`w-[90px] flex-none cursor-pointer rounded-3xl bg-[#1d1d1d] p-2 px-4 text-[10px] ${taskCount === i ? "bg-blue-600" : ""}`}
            >
              {FormatDate(task.date)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskInfo;
