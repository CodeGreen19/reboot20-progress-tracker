"use server";

import {
  existUserSchmea,
  existUserType,
  newUserSchmea,
  newUserType,
} from "@/server/schema";
import { db } from "@/lib/db/db";
import { ZodError, any } from "zod";
import {
  comparePassword,
  genToken,
  getUserById,
  hashedPassword,
  jwtDecode,
  setCookie,
} from "@/server/data/data";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const createUser = async (userData: newUserType) => {
  try {
    const { email, name, password } = newUserSchmea.parse(userData);

    let hashed = hashedPassword(password);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashed,
      },
    });
    setCookie(genToken(newUser.id));

    return { message: "user created successfully" };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return {
        error: JSON.parse(error.message) as Array<{
          code: string;
          message: string;
        }>,
      };
    }
    if (error.code === "P2002") {
      return { error: "email already exists" };
    }
    return { error: "internal server error" };
  }
};

export const loginUser = async (userData: existUserType) => {
  try {
    const { email, password } = existUserSchmea.parse(userData);
    const existUser = await db.user.findUnique({ where: { email } });
    if (existUser === null) {
      return { error: "user does't exists" };
    }

    if (!comparePassword(password, existUser?.password!)) {
      return { error: "invalid sign in credentials" };
    }

    setCookie(genToken(existUser.id));

    return { message: "user loggedin successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: JSON.parse(error.message) as Array<{
          code: string;
          message: string;
        }>,
      };
    }

    return { error: "internal server error" };
  }
};

export const logoutUser = () => {
  cookies().delete("user_token");
};

export const getUser = async () => {
  let token = cookies().get("user_token")?.value;

  if (!token) {
    return { error: "token does'nt exist" };
  }
  let decode = jwtDecode(token);
  let user = await getUserById(decode.id);

  return user;
};

export const getUserId = async () => {
  let token = cookies().get("user_token")?.value;

  if (!token) {
    return { error: "token does'nt exist" };
  }
  let decode = jwtDecode(token);

  return { id: decode.id };
};
export const authUser = async () => {
  let token = cookies().get("user_token")?.value;

  if (!token) return false;
  return true;
};

export const resetPassword = async ({
  token,
  confirmPass,
  newPass,
}: {
  token: string;
  newPass: string;
  confirmPass: string;
}) => {
  try {
    const { id } = (await jwtDecode(token)) as { id: string; iat: number };
    if (!id) {
      return { error: "invalid token" };
    }
    let user = await db.user.findUnique({ where: { id } });
    if (!user) {
      return { error: "user does'nt exist" };
    }
    if ((newPass.length || confirmPass.length) < 4) {
      return { error: "password must be 4 char" };
    }
    if (newPass !== confirmPass) {
      return { error: "new password and confirm password does'nt match" };
    }

    let hashed = await hashedPassword(newPass);

    await db.user.update({ where: { id }, data: { password: hashed } });

    return { message: "password updated successfully" };
  } catch (error) {
    return { error: "internal server error" };
  }
};
