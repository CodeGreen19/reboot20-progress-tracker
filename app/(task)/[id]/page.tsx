"use client";

import {
  clientSideErrorShow,
  clientSideMessageShow,
  newSave,
} from "@/components/data";
import Skeleton from "@/components/shared/Skeleton";
import TaskInfo from "@/components/task/TaskInfo";
import TasksCard from "@/components/task/TasksCard";
import { Button } from "@/components/ui/button";
import useSingleGoal from "@/hooks/useSingleGoal";
import { useTaskStore } from "@/hooks/useStore";
import { updateTaskFromGoal } from "@/server/actions/goal.action";
import { DayTaskType } from "@/server/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";

const TaskPage = ({ params }: { params: { id: string } }) => {
  const queryClient = useQueryClient();
  const { data, isPending } = useSingleGoal(params.id);
  const { taskCount } = useTaskStore();

  const [existDayTask, setExistDayTask] = useState<DayTaskType[]>([]);
  const [newDone, setNewDone] = useState<{
    unsaveChange: number;
    saveChange: number;
  }>({ unsaveChange: 0, saveChange: 0 });

  // update task
  const { mutate, isPending: updatePending } = useMutation({
    mutationFn: updateTaskFromGoal,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      queryClient.invalidateQueries();
    },
  });

  const updateTask = (id: string) => {
    let existTask = [...existDayTask];
    existDayTask.forEach((task, i) => {
      if (task.id! === id) {
        existTask[i] = { ...task, isDone: task.isDone ? false : true };
      }
    });
    setExistDayTask(existTask);
  };
  useEffect(() => {
    if (data?.singleGoal) {
      setExistDayTask(data.singleGoal.tasks[taskCount].dayTasks);
    }
  }, [data?.singleGoal, taskCount]);

  useEffect(() => {
    if (data?.singleGoal && existDayTask.length > 0) {
      let newCompleted = newSave(
        data?.singleGoal?.tasks[taskCount].dayTasks!,
        existDayTask,
        taskCount,
      );
      setNewDone(newCompleted);
    }
  }, [data?.singleGoal, existDayTask, taskCount]);

  return (
    <Fragment>
      {isPending ? (
        <Skeleton count={5} />
      ) : (
        <div className="pb-24">
          <TaskInfo data={data?.singleGoal!} />

          <h1 className="pt-3 text-center text-xl font-bold underline">
            My Tasks {`(${existDayTask.length})`}
          </h1>
          <TasksCard
            tasks={existDayTask}
            update={updateTask}
            firstDate={data?.singleGoal?.fromDate!}
          />
          <div className="bottom_nav justify-between px-8">
            <>
              <span>
                New added{" "}
                <span className="text-green-500">{newDone.unsaveChange}</span>{" "}
                <span className={`${newDone.saveChange > 0 ? "" : "hidden"}`}>
                  and Removed{" "}
                  <span className="text-red-500">{newDone.saveChange}</span>
                </span>
              </span>
              {newDone.saveChange === 0 && newDone.unsaveChange === 0 ? (
                ""
              ) : (
                <Button
                  disabled={updatePending}
                  className="rounded-3xl bg-black"
                  onClick={() => {
                    mutate(existDayTask);
                  }}
                >
                  {updatePending ? "Saving" : "Save"}
                </Button>
              )}
            </>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TaskPage;
