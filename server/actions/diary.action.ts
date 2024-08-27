"use server";

import { db } from "@/lib/db/db";
import { getUserIdFromCookie } from "../data/data";
export const createDiary = async ({ text }: { text: string }) => {
  try {
    let { id } = await getUserIdFromCookie();

    // Adjusting the time range to match only the specific day
    let today = new Date();
    const startOfDay = new Date(today);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(today);
    endOfDay.setHours(23, 59, 59, 999);

    let existingDiary = await db.diary.findFirst({
      where: {
        authorId: id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (existingDiary) {
      // Update the existing diary entry by adding the new text
      await db.dayTexts.create({
        data: {
          text,
          diaryId: existingDiary.id,
        },
      });
    } else {
      // Create a new diary entry
      await db.diary.create({
        data: {
          authorId: id!,
          diaryText: {
            create: [{ text }],
          },
        },
      });
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
};

export const getUserDiaries = async () => {
  try {
    let { id } = await getUserIdFromCookie();
    let diaries = await db.diary.findMany({
      where: { authorId: id },
      select: { diaryText: true, createdAt: true },
    });
    return { diaries };
  } catch (error) {
    console.error(error);
    return { error: "Internal server error" };
  }
};
