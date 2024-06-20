import { db } from "@/lib/db/db";

export const UserById = async (id: string) => {
  try {
    let user = await db.user.findUnique({ where: { id } });
    return { user };
  } catch (error) {
    return { error: "data error occurs" };
  }
};
