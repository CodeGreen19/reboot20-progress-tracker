import { getSingleGoal } from "@/server/actions/goal.action";
import { useQuery } from "@tanstack/react-query";

const fetchSingleGoal = async (id: string) => {
  const response = await getSingleGoal(id);
  return response;
};

const useSingleGoal = (id: string) => {
  return useQuery({
    queryKey: ["singleGoal"],
    queryFn: async () => await fetchSingleGoal(id),
  });
};

export default useSingleGoal;
