import {
  getGoalsBasedOnUser,
  getGoalsWithAllInfoBasedOnUser,
  getSingleGoal,
} from "@/server/actions/goal.action";
import { getUser } from "@/server/actions/user.action";
export const loggedinUser = async () => {
  let user = await getUser();
  return user;
};
/// for goal query

export const AllGoals = async () => {
  let goals = await getGoalsBasedOnUser();
  return goals;
};

export const AllGoalsWithOtherInfo = async () => {
  let goals = await getGoalsWithAllInfoBasedOnUser();
  return goals;
};

export const SingleGoal = async (id: string) => {
  let goals = await getSingleGoal(id);
  return goals;
};
