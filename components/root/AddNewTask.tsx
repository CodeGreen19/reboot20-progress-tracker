"use client";
import React, { Fragment, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DatePicker } from "./DatePicker";

import { BsTrash } from "react-icons/bs";
import { CiCircleList } from "react-icons/ci";
import { createGoal } from "@/server/actions/goal.action";

import {
  clientSideErrorShow,
  clientSideMessageShow,
  dateDifference,
} from "../data";
import { DayTaskType, GoalType, TaskType } from "@/server/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addDays } from "@/components/data";
import { isToDateAboveFromNow } from "../statistics";

const AddNewTask: React.FC = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [goalTilte, setGoalTitle] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [tasks, setTasks] = useState<DayTaskType[]>([]);

  const hanldeAddTask = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!taskTitle) return;
    setTaskTitle("");
    setTasks((prev) => [...prev, { title: taskTitle, isDone: false }]);
  };
  const hanldeDelete = (title: string) => {
    let updatedTasks = tasks.filter((prev) => title !== prev.title);
    setTasks(updatedTasks);
  };

  const { mutate, data, isPending } = useMutation({
    mutationFn: createGoal,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      setGoalTitle("");
      setFromDate(undefined);
      setToDate(undefined);
      setTasks([]);
      queryClient.invalidateQueries();
      router.push("/");
    },
  });

  const handleSubmit = async () => {
    if (goalTilte === "")
      return clientSideErrorShow("pleae add a goal title !");
    if (!fromDate || !toDate)
      return clientSideErrorShow(" please fill both from data and to data.");

    if (!isToDateAboveFromNow(fromDate)) {
      return clientSideErrorShow("from date must be above from today");
    }
    if (tasks.length === 0) {
      return clientSideErrorShow("please add some tasks.");
    }

    //

    let CustomizedTaskData = (
      info: DayTaskType[],
      fromDate: Date,
      toDate: Date,
    ) => {
      let diffrenceArr = dateDifference(fromDate, toDate);

      let data: TaskType[] = diffrenceArr.map((_, i) => {
        return {
          date: addDays(fromDate, i),
          dayTasks: info,
        };
      });
      return data;
    };

    let data = CustomizedTaskData(tasks, fromDate, toDate);

    let TaskInfo: GoalType = {
      goal: goalTilte,
      fromDate,
      toDate,
      tasks: data,
      status: "ongoing",
    };

    mutate(TaskInfo);
  };

  return (
    <Fragment>
      <div className="mx-auto mt-2 p-4 text-center">
        <h2 className="mb-3 text-2xl font-bold text-gray-300 underline">
          Create new goal
        </h2>
        <div>
          <Input
            value={goalTilte}
            onChange={(e) => setGoalTitle(e.target.value)}
            type="text"
            placeholder="Enter title of your goal"
            className="rounded-md border-main bg-[#181818] py-5 placeholder:text-gray-400 focus:border-[gray]"
          />
          <div className="mt-3 flex flex-col items-center justify-center gap-1">
            <span>From</span>
            <DatePicker date={fromDate} setDate={setFromDate} />
            <span>To</span>
            <DatePicker date={toDate} setDate={setToDate} />
          </div>
          <form
            className="relative mt-6 flex items-center justify-between"
            onSubmit={hanldeAddTask}
          >
            <Input
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Enter Task here...."
              className="rounded-md border-main bg-[#181818] py-5 placeholder:text-gray-400 focus:border-[gray]"
            />
            <Button className="bg-green-700 hover:bg-green-800" type="submit">
              Add
            </Button>
          </form>
          <ul className="mt-3 w-full">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li
                  key={task.id}
                  className="relative my-[2px] flex w-full items-center justify-start gap-2 rounded-md bg-[#181818] p-2 pr-8 text-start text-sm sm:text-[16px]"
                >
                  <CiCircleList className="text-sm text-blue-600" />
                  {task.title}
                  <BsTrash
                    onClick={() => hanldeDelete(task.title)}
                    className="absolute right-3 top-[10px] cursor-pointer text-red-700"
                  />
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-300">
                No task has been added yet ! add some tasks to create your goal
                ...
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="fixed bottom-12 flex w-full max-w-xl justify-center rounded-lg bg-[#0000006b]">
        <Button
          onClick={handleSubmit}
          disabled={isPending}
          className="m-2 mb-8 bg-green-700 hover:bg-green-800"
        >
          {isPending ? "Creating Goal...." : "Create Goal"}
        </Button>
      </div>
    </Fragment>
  );
};

export default AddNewTask;
