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
    let allCommit = await db.commitment.findMany({ where: { authorId: id } });

    return { allCommit };
  } catch (error) {
    return { error: "error occurs" };
  }
};

export const completeCommit = async ({ id }: { id: string }) => {
  try {
    await db.commitment.update({ where: { id }, data: { isCompleted: true } });

    return { message: "completed" };
  } catch (error) {
    return { error: "error occurs" };
  }
};
