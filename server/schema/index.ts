import * as z from "zod";

// users
export const newUserSchmea = z.object({
  name: z.string().min(3, "name must be at least 3 character"),
  email: z.string().email("invalid email address"),
  password: z.string().min(4, "password must be at least 4 character"),
});

export const existUserSchmea = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(4, "password must be at least 4 character"),
});

// Goal Schema
export const StatusEnum = z.enum(["ongoing", "completed"]);

export const GoalSchema = z
  .object({
    id: z.string().optional(),
    goal: z.string(),
    fromDate: z.date(),
    toDate: z.date(),
    authorId: z.string().optional(),
    tasks: z.array(z.lazy(() => TaskSchema)).optional(),
    status: StatusEnum,
  })
  .refine((data) => data.fromDate < data.toDate, {
    message: "fromDate must be less than toDate",
    path: ["fromDate"],
  });

// Task Schema
export const TaskSchema = z.object({
  id: z.string().optional(),
  date: z.date(),
  dayTasks: z.array(z.lazy(() => DayTaskSchmea)).optional(),
  goalId: z.string().cuid().optional(),
});

// day tasks
export const DayTaskSchmea = z.object({
  id: z.string().optional(),
  title: z.string(),
  isDone: z.boolean(),
  taskId: z.string().cuid().optional(),
});

// export types
export type newUserType = z.infer<typeof newUserSchmea>;
export type existUserType = z.infer<typeof existUserSchmea>;
export type GoalType = z.infer<typeof GoalSchema>;
export type TaskType = z.infer<typeof TaskSchema>;
export type StatusType = z.infer<typeof StatusEnum>;
export type DayTaskType = z.infer<typeof DayTaskSchmea>;
