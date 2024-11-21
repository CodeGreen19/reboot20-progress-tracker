"use client";

import { clientSideErrorShow, clientSideMessageShow } from "@/components/data";
import CustomBtn from "@/components/shared/CustomBtn";
import Skeleton from "@/components/shared/Skeleton";
import TaskInfo from "@/components/task/TaskInfo";
import TasksCard from "@/components/task/TasksCard";
import { useTaskStore } from "@/hooks/useStore";
import {
  getSingleGoal,
  updateTaskFromGoal,
} from "@/server/actions/goal.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment } from "react";

const TaskPage = ({ params }: { params: { id: string } }) => {
  const queryClient = useQueryClient();
  const { taskCount, existDayTasks, setExistDayTasks, done, setDone } =
    useTaskStore();

  // query the data
  const { data, isPending } = useQuery({
    queryKey: ["singleGoal"],
    queryFn: async () => {
      let info = await getSingleGoal(params.id);
      // update the exist task
      if (info.singleGoal) {
        let existDayTaskInfo = info.singleGoal.tasks[taskCount].dayTasks;
        setExistDayTasks(existDayTaskInfo);
      }

      return info;
    },
  });

  // update task
  const { mutate, isPending: updatePending } = useMutation({
    mutationFn: updateTaskFromGoal,
    onSuccess: async ({ error, message }) => {
      if (error) {
        return clientSideErrorShow(error);
      }
      if (message) clientSideMessageShow(message);
      await queryClient.invalidateQueries({ queryKey: ["singleGoal"] });
    },
  });

  const updateTask = (id: string) => {
    let updatedTasks = [...existDayTasks];
    existDayTasks.forEach((task, i) => {
      if (task.id! === id) {
        updatedTasks[i] = { ...task, isDone: task.isDone ? false : true };
      }
    });

    // is changed
    let count = 0;
    let updateCount = 0;

    data?.singleGoal?.tasks[taskCount].dayTasks.forEach((element) => {
      if (element.isDone === false) {
        count++;
      }
    });

    updatedTasks.forEach((element) => {
      if (element.isDone === false) {
        updateCount++;
      }
    });

    if (count === updateCount) {
      setDone(false);
    } else {
      setDone(true);
    }

    // task updated
    setExistDayTasks(updatedTasks);
  };

  return (
    <Fragment>
      {isPending ? (
        <Skeleton count={5} />
      ) : (
        <div className="px-1 pb-24">
          <TaskInfo data={data?.singleGoal!} />

          <h1 className="text-md rounded-lg bg-gradient-to-b from-green-500/10 to-transparent p-3 text-center font-semibold text-green-500">
            My today&apos;s tasks
          </h1>
          <TasksCard
            tasks={existDayTasks}
            update={updateTask}
            firstDate={data?.singleGoal?.fromDate!}
          />
          <div className="bottom_nav justify-between px-8 text-sm sm:text-base">
            <>
              <span className="text-gray-500">
                Tasks count (
                <span className="mx-1 text-green-500">
                  {data?.singleGoal?.tasks[0].dayTasks.length}
                </span>
                )
              </span>
              {done && (
                <CustomBtn
                  disable={updatePending}
                  isPending={updatePending}
                  className="min-w-14 rounded-3xl bg-green-600 py-0 text-xs text-white hover:bg-green-700"
                  onClick={() => {
                    mutate(existDayTasks);
                    setDone(false);
                  }}
                >
                  Update
                </CustomBtn>
              )}
            </>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default TaskPage;
