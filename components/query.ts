import { getUser } from "@/server/actions/user.action";
export const loggedinUser = async () => {
  let user = await getUser();
  return user;
};
