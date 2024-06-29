import { DayTaskType, GoalType } from "@/server/schema";
import { dateDifference } from "./data";

export const ShowProgressInPercent = (info: DayTaskType[]): number => {
  let done = info.filter((data) => data.isDone === true);
  let percent = (done.length * 100) / info.length;

  return Math.floor(percent);
};

export const timeLeft = (targetDate: Date): string => {
  const now = new Date();

  // Calculate the difference in milliseconds
  const diff = targetDate.getTime() - now.getTime();

  // Calculate the days and hours from the difference
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${days + 1} days ${hours} hours`;
};
export const isGoalDateOver = (targetDate: Date): boolean => {
  const now = new Date();
  return now >= targetDate;
};
export const isToDateAboveFromNow = (fromDate: Date): boolean => {
  const now = new Date();
  return now < fromDate;
};

export const overallSuccessOfGoal = (goal: GoalType): number => {
  let success: number = 0;
  let length: number = 0;
  for (let i = 0; i < goal.tasks!.length; i++) {
    success += ShowProgressInPercent(goal.tasks![i].dayTasks!);
    length++;
  }
  return Math.floor(success / length);
};

export const ShowMoreSuccessfullTask = (
  goal: GoalType,
): (number | undefined)[] | undefined => {
  let data = goal.tasks?.map(
    (info) => info.dayTasks?.filter((item) => item.isDone === true).length,
  );
  return data;
};

export const AvarageGoalLength = (goal: GoalType[]) => {
  let data = goal.map(
    (info) => dateDifference(info.fromDate, info.toDate).length,
  );
  let avg: number = 0;
  data.forEach((d) => {
    avg += d;
  });
  return Math.floor(avg / data.length);
};

export const ShowLargestSuccessOfGoal = (goal: GoalType[]) => {
  let data = goal.map((info) => overallSuccessOfGoal(info));

  return Math.max(...data);
};

export const AverageSuccessOfAllGoal = (goal: GoalType[]) => {
  let data = goal.map((info) => overallSuccessOfGoal(info));
  let sum = 0;

  data.forEach(function (item) {
    sum += item;
  });

  return Math.floor(sum / data.length);
};
