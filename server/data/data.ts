import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db/db";

export const setCookie = (token: string) => {
  cookies().set({
    name: "user_token",
    value: token,
    httpOnly: true,
    expires: Date.now() + 21 * 24 * 60 * 60 * 3000,
  });
};

export const hashedPassword = (password: string): string => {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const genToken = (id: string): string => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET!);
  return token;
};
export const jwtDecode = (token: string) => {
  const data = jwt.verify(token, process.env.JWT_SECRET!) as {
    id: string;
    iat: number;
  };
  return data;
};

export const comparePassword = (
  password: string,
  hashedPass: string,
): boolean => {
  return bcrypt.compareSync(password, hashedPass);
};

export const getUserById = async (id: string) => {
  try {
    let user = await db.user.findUnique({
      where: { id },
      include: { commitments: true },
    });
    return user;
  } catch (error) {
    return { error: "user does'nt found" };
  }
};

export const getUserIdFromCookie = async () => {
  let token = cookies().get("user_token")?.value;

  if (!token) {
    return { error: "token does'nt exist" };
  }
  let decode = jwtDecode(token);

  return { id: decode.id };
};
