"use server";

import { PrayNamesType } from "@/components/pray/data";
import { db } from "@/lib/db/db";

export const addPray = async (prayName: PrayNamesType) => {
  try {
    let today = new Date();
    let startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of the day
    let endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of the day

    const toayPrayer = await db.pray.findFirst({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    if (toayPrayer) {
      await db.pray.update({
        where: { id: toayPrayer.id },
        data: {
          Fazar: prayName === "Fazar" ? true : toayPrayer.Fazar,
          Jahar: prayName === "Jahar" ? true : toayPrayer.Jahar,
          Ashar: prayName === "Ashar" ? true : toayPrayer.Ashar,
          Magrib: prayName === "Magrib" ? true : toayPrayer.Magrib,
          Esha: prayName === "Esha" ? true : toayPrayer.Esha,
        },
      });
    } else {
      await db.pray.create({
        data: {
          Fazar: prayName === "Fazar" ? true : false,
          Jahar: prayName === "Jahar" ? true : false,
          Ashar: prayName === "Ashar" ? true : false,
          Magrib: prayName === "Magrib" ? true : false,
          Esha: prayName === "Esha" ? true : false,
        },
      });
    }
  } catch (error) {
    return { error: "error occurs" };
  }
};
export const todayPray = async () => {
  try {
    let today = new Date();
    let startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Start of the day
    let endOfDay = new Date(today.setHours(23, 59, 59, 999)); // End of the day

    const todayPrayer = await db.pray.findFirst({
      where: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    if (todayPrayer) {
      return { info: todayPrayer };
    } else {
      return { info: null };
    }
  } catch (error) {
    return { error: "error occurs" };
  }
};
export const allPrayers = async () => {
  try {
    const allprayers = await db.pray.findMany({ orderBy: { id: "asc" } });
    return { allprayers };
  } catch (error) {
    return { error: "error occurs" };
  }
};
