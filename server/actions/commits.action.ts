"use server";

import { db } from "@/lib/db/db";

export const createCommits = async ({
  id,
  text,
}: {
  id: string;
  text: string;
}) => {
  try {
    let newCommit = await db.commitment.create({
      data: {
        text,
        authorId: id,
      },
    });
    return { newCommit, message: "created" };
  } catch (error) {
    return { error: "error occurs" };
  }
};
export const allCommitments = async ({ id }: { id: string }) => {
  try {
    let allCommit = await db.commitment.findMany({
      where: { authorId: id },
      orderBy: { id: "asc" },
    });

    return { allCommit };
  } catch (error) {
    return { error: "error occurs" };
  }
};

export const completeCommit = async ({
  id,
  done,
  fail,
}: {
  id: string;
  done: boolean;
  fail: boolean;
}) => {
  try {
    if (done) {
      await db.commitment.update({
        where: { id },
        data: { isCompleted: true, isFailed: false },
      });
    }
    if (fail) {
      await db.commitment.update({
        where: { id },
        data: { isFailed: true, isCompleted: false },
      });
    }
    return { message: "completed" };
  } catch (error) {
    return { error: "error occurs" };
  }
};
