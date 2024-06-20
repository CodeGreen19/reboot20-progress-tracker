"use server";

import { db } from "@/lib/db/db";
import { UserById } from "../data";

export const progress = async (text: string) => {
  try {
    const data = await db.user.findMany();
    let user = await UserById(data[0].id);
    return { user };
  } catch (error) {
    return { error: "error occurs" };
  }
};
