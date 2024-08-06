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
  const dayAfterTargetDate = new Date(targetDate);
  dayAfterTargetDate.setDate(dayAfterTargetDate.getDate() + 1);

  return now >= dayAfterTargetDate;
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
  let filteredDate: { data: number[] }[] = [];
  goal.tasks?.forEach((info, i) => {
    let mapped = info.dayTasks?.map((item) => (item.isDone ? 1 : 0))!;
    filteredDate.push({ data: mapped });
  });
  const summedData = filteredDate.reduce<number[]>((acc, item) => {
    item.data.forEach((num, idx) => {
      acc[idx] = (acc[idx] || 0) + num;
    });
    return acc;
  }, []);

  return summedData;
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

type Task = {
  text: string;
  num: number;
};
export const TaskWithCompletedPercent = (data: GoalType): Task[] => {
  let combinedArray = data.tasks?.map((item) => {
    let arr: Task[] | undefined = item.dayTasks?.map((d) => {
      return { text: d.title, num: d.isDone ? 1 : 0 };
    });

    return arr;
  });
  // Ensure type safety by filtering and flattening the array
  const filteredArray: Task[] = (combinedArray || [])
    .filter((arr): arr is Task[] => arr !== undefined)
    .flat();

  // Calculate the length of combined arrays
  const combinedLength = combinedArray?.length || 1; // Use 1 to avoid division by zero

  // Create a map to group by text and sum the num properties
  const mergedMap: { [key: string]: Task } = filteredArray.reduce(
    (acc, item) => {
      if (!acc[item.text]) {
        acc[item.text] = { text: item.text, num: 0 };
      }
      acc[item.text].num += item.num;
      return acc;
    },
    {} as { [key: string]: Task },
  );

  // Convert the map back to an array and calculate percentages
  const mergedArray: Task[] = Object.values(mergedMap).map((item) => ({
    text: item.text,
    num: Math.round((item.num / combinedLength) * 100),
  }));
  return mergedArray;
};
