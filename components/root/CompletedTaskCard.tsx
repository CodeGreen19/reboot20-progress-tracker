import React from "react";
import { Button } from "../ui/button";
import TextSmaller from "../shared/TextSmaller";
import Link from "next/link";
import { GoalType } from "@/server/schema";
import FormatDate from "../shared/FormatDate";
import {
  clientSideErrorShow,
  clientSideMessageShow,
  dateDifference,
} from "../data";
import { isGoalDateOver } from "../statistics";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusFromGoal } from "@/server/actions/goal.action";

import { HiDotsVertical } from "react-icons/hi";
import DeleteAction from "./DeleteAction";

const CompletedTaskCard = ({ goal }: { goal: GoalType }) => {
  const { id, goal: title, fromDate, toDate, status } = goal;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateStatusFromGoal,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      queryClient.invalidateQueries();
    },
  });
  let success = 90;

  return (
    <div className="relative w-full rounded-xl border bg-[#181818] p-3">
      <div className="absolute right-7 top-4">
        <DeleteAction goalId={id!}>
          <HiDotsVertical />
        </DeleteAction>
      </div>
      <div>
        <h2>
          Goal :{" "}
          <span>
            <TextSmaller text={title} count={35} />
          </span>
        </h2>
        <h3 className="text-sm">
          Date :{" "}
          <span>
            {FormatDate(fromDate)} <span className="text-gray-400">to </span>
            {FormatDate(toDate)}
            <span className="ml-1 text-[10px] text-gray-400">{`   (${dateDifference(fromDate, toDate).length} days)`}</span>
          </span>
        </h3>

        <h1>
          Status :{" "}
          <span
            className={`text-sm ${success >= 90 ? "text-green-600" : success >= 70 ? "text-yellow-600" : "text-red-600"}`}
          >
            <span className={`${status === "ongoing" && "!text-gray-300"}`}>
              {status}
            </span>
          </span>
        </h1>
        <div className="flex items-center justify-between">
          <h1 className="text-sm">
            Overall Success :{" "}
            {status === "ongoing" ? (
              <span className="text- text-sm">pending</span>
            ) : (
              <span
                className={`${success >= 90 ? "text-green-500" : success >= 70 ? "text-yellow-500" : "text-red-500"}`}
              >
                {success}%
              </span>
            )}
          </h1>
          {!isGoalDateOver(toDate) ? (
            <Link href={`/${id}`}>
              <Button
                className="text-green-500 hover:bg-transparent hover:text-green-700"
                variant={"ghost"}
              >
                complete task
              </Button>
            </Link>
          ) : status === "ongoing" ? (
            <Button
              onClick={() => mutate(id!)}
              className="relative text-yellow-500 hover:bg-transparent hover:text-yellow-700"
              variant={"ghost"}
            >
              <span className="absolute -top-5 text-sm text-red-400">
                {"time's up"}
              </span>{" "}
              <span className="ml-1 rounded-lg bg-green-600 p-1 text-white">
                create analytics
              </span>
            </Button>
          ) : (
            <Link href={`/analytics/${id}`}>
              <Button
                className="text-blue-500 hover:bg-transparent hover:text-blue-700"
                variant={"ghost"}
              >
                view analytics
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedTaskCard;
