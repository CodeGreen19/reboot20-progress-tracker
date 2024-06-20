"use server";

import { genToken } from "../data/data";
import { db } from "@/lib/db/db";
import sendEmail from "../data/sendmail";

export const SendMailToUser = async (email: string) => {
  const isEmailExist = await db.user.findUnique({ where: { email } });
  if (!isEmailExist) {
    return { error: "email does'nt exists" };
  }
  let { id } = isEmailExist;
  let token = genToken(id);

  await sendEmail(token, email);
  return { message: "email successfully sent" };
};
