"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { findTimeDifferences, toHoursAndMinutes } from "@/components/data";

type UrineDayInfoType = {
  id: string;
  times: Date[];
  createdAt: Date;
  authorId: string;
};

const UrineDayInfo = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: UrineDayInfoType;
}) => {
  const { longestDiff, shortestDiff } = findTimeDifferences(data.times);
  return (
    <div className="px-3">
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="w-3/4 rounded-md bg-stone-900">
          <DialogHeader>
            <DialogTitle className="my-3 text-start">
              {format(data.createdAt, "dd MMM, EEEE")}
            </DialogTitle>
            <div className="rounded-lg bg-black p-3 text-start text-sm">
              <div> total count : {data.times.length}</div>
              <div className="text-amber-400">
                {" "}
                min after : {toHoursAndMinutes(shortestDiff)}
              </div>
              <div className="text-green-500">
                {" "}
                max after : {toHoursAndMinutes(longestDiff)}
              </div>
            </div>
            <h1 className="text-sm text-gray-500">
              The lists of leaving urine
            </h1>
            <ul className="mt-3 grid grid-cols-3 gap-2 rounded-lg bg-black p-3 text-sm">
              {data.times.map((item, i) => (
                <li key={i}>{format(item, "p")}</li>
              ))}
            </ul>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UrineDayInfo;
