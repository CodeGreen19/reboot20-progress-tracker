"use server";

import { genToken, getUserIdFromCookie } from "../data/data";
import { db } from "@/lib/db/db";

export const addUrine = async () => {
  try {
    let { id } = await getUserIdFromCookie();
    const today = new Date();

    let urineRecords = await db.urine.findMany({ where: { authorId: id } });

    if (urineRecords.length === 0) {
      await db.urine.create({
        data: {
          authorId: id!,
          times: [today],
        },
      });

      return { message: "updated" };
    }
    let lastRecords = urineRecords[urineRecords.length - 1];

    console.log(lastRecords.createdAt.toDateString(), today.toDateString());

    if (lastRecords.createdAt.toDateString() === today.toDateString()) {
      await db.urine.update({
        where: { id: urineRecords[0].id },
        data: {
          times: { push: today },
        },
      });
      return { message: "updated" };
    } else {
      await db.urine.create({
        data: {
          authorId: id!,
          times: [today],
        },
      });

      return { message: "updated" };
    }
  } catch (error) {
    console.log(error);

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
