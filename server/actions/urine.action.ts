"use server";

import { genToken, getUserIdFromCookie } from "../data/data";
import { db } from "@/lib/db/db";

export const addUrine = async () => {
  try {
    let { id } = await getUserIdFromCookie();
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    let urineRecord = await db.urine.findFirst({
      where: {
        authorId: id!,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    if (!urineRecord) {
      await db.urine.create({
        data: {
          authorId: id!,
          times: [new Date()],
        },
      });
      return { message: "updated" };
    } else {
      await db.urine.update({
        where: { id: urineRecord.id },
        data: {
          times: { push: new Date() },
        },
      });
      return { message: "updated" };
    }
  } catch (error) {
    return { error: "error occurs" };
  }
};
export const getUrineInfo = async () => {
  try {
    let { id } = await getUserIdFromCookie();
    let data = await db.urine.findMany({ where: { authorId: id! } });
    return { info: data };
  } catch (error) {
    return { error: "error occurs" };
  }
};
