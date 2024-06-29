import { DayTaskType } from "@/server/schema";
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
): { unsaveChange: number; saveChange: number } => {
  let unsaveChange = 0;
  let saveChange = 0;

  for (let i = 0; i < existDayTask.length; i++) {
    if (
      newDayTask.length > 0 &&
      existDayTask[i].isDone !== newDayTask[i].isDone
    ) {
      if (newDayTask[i].isDone) {
        unsaveChange++;
      } else {
        saveChange++;
      }
    }
  }

  return { unsaveChange, saveChange };
};
