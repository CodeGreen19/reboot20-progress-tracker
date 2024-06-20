import * as z from "zod";

export const newUserSchmea = z.object({
  name: z.string().min(3, "name must be at least 3 character"),
  email: z.string().email("invalid email address"),
  password: z.string().min(4, "password must be at least 4 character"),
});

export type newUserType = z.infer<typeof newUserSchmea>;

export const existUserSchmea = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(4, "password must be at least 4 character"),
});

export type existUserType = z.infer<typeof existUserSchmea>;
