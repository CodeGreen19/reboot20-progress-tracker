import { DayTaskType } from "@/server/schema";
import { compareAsc, differenceInMinutes } from "date-fns";
import toast from "react-hot-toast";
type ToastType = {
  text: string;
  type: "error" | "success";
};
let theme = {
  style: {
    backgroundColor: "black",
    color: "snow",
  },
};
export const showToast = ({ type, text }: ToastType) => {
  if (type === "error") {
    toast.error(text, theme);
  }
  if (type === "success") {
    toast.success(text, theme);
  }
};

export const clientSideErrorShow = (error: any) => {
  if (typeof error === "string") {
    return showToast({ type: "error", text: error });
  } else if (Array.isArray(error)) {
    return showToast({ type: "error", text: error[0].message });
  }
  return;
};
export const clientSideMessageShow = (message: string) => {
  if (message) {
    showToast({ type: "success", text: message });
  }
  return;
};

export const dateDifference = (date1: Date, date2: Date): Array<number> => {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  let diffArr = [];
  for (let i = 0; i < diffDays; i++) {
    diffArr.push(i);
  }
  return diffArr;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const newSave = (
  existDayTask: DayTaskType[],
  newDayTask: DayTaskType[],
  taskCount: number,
): { unsaveChange: number; saveChange: number } => {
  let unsaveChange = 0;
  let saveChange = 0;

  if (newDayTask.length > 0 && existDayTask) {
    for (let i = 0; i < existDayTask.length; i++) {
      if (
        newDayTask.length > 0 &&
        existDayTask.length > 0 &&
        newDayTask[i].isDone &&
        existDayTask[i].isDone !== newDayTask[i].isDone
      ) {
        if (newDayTask[i].isDone) {
          unsaveChange++;
        } else {
          saveChange++;
        }
      }
    }
  }

  return { unsaveChange, saveChange };
};

export function SortedDates(dates: Date[]): {} {
  // Sort the dates in ascending order
  const sortedDates = dates.sort(compareAsc);

  return sortedDates;
}

export function findTimeDifferences(dates: Date[]): {
  shortestDiff: number;
  longestDiff: number;
} {
  if (dates.length < 2) {
    return {
      longestDiff: 0,
      shortestDiff: 0,
    };
  }

  // Sort the dates in ascending order
  const sortedDates = dates.sort(compareAsc);

  let shortestDiff = Infinity;
  let longestDiff = 0;

  // Iterate through sorted dates and calculate differences between consecutive times
  for (let i = 1; i < sortedDates.length; i++) {
    const diffInMinutes = differenceInMinutes(
      sortedDates[i],
      sortedDates[i - 1],
    );

    // Update the shortest and longest differences
    if (diffInMinutes < shortestDiff) {
      shortestDiff = diffInMinutes;
    }
    if (diffInMinutes > longestDiff) {
      longestDiff = diffInMinutes;
    }
  }

  return {
    shortestDiff: shortestDiff, // Shortest difference in minutes
    longestDiff: longestDiff, // Longest difference in minutes
  };
}

export function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} hours ${minutes} minutes`;
}
