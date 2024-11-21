"use client";

import { BsCheck } from "react-icons/bs";

import { useTaskStore } from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { DayTaskType } from "@/server/schema";
import { ListTodo } from "lucide-react";
import { clientSideErrorShow } from "../data";

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
  };

  return (
    <div>
      <ul className="p-4">
        {tasks.map((task) => (
          <li
            className={cn(
              "group my-1 flex cursor-pointer items-center justify-between rounded-3xl p-3 px-4",
              task.isDone ? "done bg-black/15" : "undone bg-black/40",
            )}
            onClick={() => handleUpdate(task.id!)}
            key={task.id}
          >
            <div className="flex items-center gap-1">
              <ListTodo className="p-1 text-yellow-500 group-[.done]:text-gray-500" />
              <span
                className={`text-[12px] sm:text-[1rem] ${task.isDone && "text-gray-500"}`}
              >
                {task.title}
              </span>
            </div>

            <BsCheck className="text-xl text-green-500 group-[.undone]:text-gray-700" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksCard;
