"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { BsCheck, BsCircle } from "react-icons/bs";

import { DayTaskType } from "@/server/schema";
import { isGoalDateOver } from "../statistics";
import { clientSideErrorShow } from "../data";
import { useTaskStore } from "@/hooks/useStore";
import { setDate } from "date-fns";
import FormatDate from "../shared/FormatDate";

const TasksCard = ({
  tasks,
  update,
  firstDate,
}: {
  tasks: DayTaskType[];
  update: (id: string) => void;
  firstDate: Date;
}) => {
  const { taskCount } = useTaskStore();
  const handleUpdate = (dayTaskId: string) => {
    let date = new Date(); // Current date and time
    let selectedDate = new Date(firstDate); // Create a new Date object from firstDate
    selectedDate.setDate(selectedDate.getDate() + taskCount); // Modify the new Date object

    // Check if the current date is past the selected date

    let currentDate =
      date.toString().slice(0, 15) === selectedDate.toString().slice(0, 15)
        ? true
        : false;
    if (date > selectedDate && !currentDate) {
      clientSideErrorShow("Time's Up, you can't edit the task");
    } else if (currentDate) {
      update(dayTaskId);
    } else {
      clientSideErrorShow("The day hasn't come, try later");
    }

    update(dayTaskId);
  };

  return (
    <div>
      <ul className="p-4">
        {tasks.map((task) => (
          <li
            className="my-1 flex cursor-pointer items-center justify-between rounded-3xl bg-[#191919] p-3 px-4"
            onClick={() => handleUpdate(task.id!)}
            key={task.id}
          >
            <span
              className={`text-[12px] sm:text-[1rem] ${task.isDone && "text-gray-500"}`}
            >
              {task.title}
            </span>

            {task.isDone ? (
              <BsCheck className="text-xl text-green-500" />
            ) : (
              <BsCircle className="text-xl text-gray-500" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksCard;
