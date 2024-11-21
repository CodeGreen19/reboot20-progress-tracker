import { DayTaskType } from "@/server/schema";
import { create } from "zustand";

interface UserState {
  name: string;
  email: string;
  memberSince: string;
  logout: () => void;
  setInfo: (name: string, email: string, memberSince: string) => void;
}

// user store
export const useUserStore = create<UserState>((set) => ({
  name: "John Doe",
  email: "johndoe@example.com",
  memberSince: "January 1, 2020",
  logout: () => set({ name: "", email: "", memberSince: "" }),
  setInfo: (name, email, memberSince) => set({ name, email, memberSince }),
}));

interface TaskStore {
  done: boolean;
  setDone: (val: boolean) => void;
  taskCount: number;
  existDayTasks: DayTaskType[];
  setTaskCount: (count: number) => void;
  setExistDayTasks: (item: DayTaskType[]) => void;
  clearTaskCount: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  done: false,
  setDone: (val) => set({ done: val }),

  taskCount: 0,
  existDayTasks: [],
  setExistDayTasks: (items) => set({ existDayTasks: items }),
  setTaskCount: (count: number) => set({ taskCount: count }),
  clearTaskCount: () => set({ taskCount: 0 }),
}));

interface GoalId {
  goadIdArr: string[];
  setGoalIdArr: (goalId: string[]) => void;
}

export const useGoalsIdStore = create<GoalId>((set) => ({
  goadIdArr: [],
  setGoalIdArr: (goalId: string[]) => set({ goadIdArr: goalId }),
}));
