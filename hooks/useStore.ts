import { create } from "zustand";

interface UserState {
  name: string;
  email: string;
  memberSince: string;
  logout: () => void;
  setInfo: (name: string, email: string, memberSince: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "John Doe",
  email: "johndoe@example.com",
  memberSince: "January 1, 2020",
  logout: () => set({ name: "", email: "", memberSince: "" }),
  setInfo: (name, email, memberSince) => set({ name, email, memberSince }),
}));
export const useProgressStore = create<{
  progress: number;
  setProgress: () => void;
}>((set) => ({
  progress: 100,
  setProgress: () => set((state) => ({ progress: state.progress + 1 })),
}));
