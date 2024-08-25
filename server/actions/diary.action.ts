"use server";

import { db } from "@/lib/db/db";
import { format } from "date-fns";
import { getUserIdFromCookie } from "../data/data";

export const createDiary = async (text: string) => {
  try {
    let { id } = await getUserIdFromCookie();

    const today = format(new Date(), "yyyy-MM-dd");

    let existingDiary = await db.diary.findFirst({
      where: {
        authorId: id,
        createdAt: {
          gte: new Date(today),
        },
      },
    });

    if (existingDiary) {
      await db.diary.update({
        where: { id: existingDiary.id },
        data: {
          diaryText: [...existingDiary.diaryText, text],
        },
      });
    } else {
      await db.diary.create({
        data: {
          diaryText: [text],
          authorId: id!,
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
