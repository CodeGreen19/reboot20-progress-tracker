"use server";

import { db } from "@/lib/db/db";
import { DayTaskType, GoalSchema, GoalType, TaskType } from "../schema";
import { ZodError } from "zod";
import { getUserId } from "./user.action";

export const createGoal = async (info: GoalType) => {
  try {
    let userInfo = await getUserId();
    if (userInfo.error) {
      return { error: userInfo.error };
    }

    let { fromDate, goal, status, toDate, tasks } = info;

    let newGoal = await db.goal.create({
      data: {
        fromDate,
        toDate,
        goal,
        status,
        authorId: userInfo.id!,
        tasks: {
          create: tasks?.map((task: TaskType) => ({
            date: task.date,
            dayTasks: {
              create: task.dayTasks?.map((dtask: DayTaskType) => ({
                title: dtask.title,
                isDone: dtask.isDone,
              })),
            },
          })),
        },
      },
      include: {
        tasks: {
          include: {
            dayTasks: true,
          },
        },
      },
    });

    return { message: "goal created successfully", newGoal };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return {
        error: JSON.parse(error.message) as Array<{
          code: string;
          message: string;
        }>,
      };
    }
    return { error: "internal server error" };
  }
};

export const getGoalsBasedOnUser = async () => {
  try {
    let userInfo = await getUserId();
    if (userInfo.error) {
      return { error: userInfo.error };
    }
    const users = await db.user.findUnique({
      where: { id: userInfo.id },
      include: {
        goals: { include: { tasks: { include: { dayTasks: true } } } },
      },
    });
    return { users };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const getSingleGoal = async (id: string) => {
  try {
    const singleGoal = await db.goal.findUnique({
      where: {
        id,
      },

      include: {
        tasks: { include: { dayTasks: true }, orderBy: { id: "asc" } },
      },
    });
    return { singleGoal };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const updateTaskFromGoal = async (info: DayTaskType[]) => {
  try {
    for (let i = 0; i < info.length; i++) {
      await db.dayTask.update({
        where: { id: info[i].id },
        data: { isDone: info[i].isDone },
      });
    }
    return { message: "task updated successfully" };
  } catch (error) {
    return { error: "internal server error " };
  }
};
export const updateStatusFromGoal = async (goalId: string) => {
  try {
    await db.goal.update({
      where: { id: goalId },
      data: {
        status: "completed",
      },
    });
    return { message: "status updated successfully" };
  } catch (error) {
    return { error: "internal server error " };
  }
};

export const getGoalsWithAllInfoBasedOnUser = async () => {
  try {
    let userInfo = await getUserId();
    if (userInfo.error) {
      return { error: userInfo.error };
    }
    const goals = await db.user.findUnique({
      where: { id: userInfo.id },
      include: {
        goals: { include: { tasks: { include: { dayTasks: true } } } },
      },
    });
    return { goals };
  } catch (error) {
    return { error: "internal server error" };
  }
};

export const DeleteGoalWithAllInfo = async (goalId: string) => {
  try {
    // Delete all DayTasks related to the goal
    await db.dayTask.deleteMany({
      where: {
        tasks: {
          goalId: goalId,
        },
      },
    });

    // Delete all Tasks related to the goal
    await db.tasks.deleteMany({
      where: {
        goalId: goalId,
      },
    });

    // Delete the Goal
    await db.goal.delete({
      where: {
        id: goalId,
      },
    });
    return { message: "goal deleted successfully" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
