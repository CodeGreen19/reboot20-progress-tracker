import React, { ReactNode } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteGoalWithAllInfo } from "@/server/actions/goal.action";
import { clientSideErrorShow, clientSideMessageShow } from "../data";

const DeleteAction = ({
  children,
  goalId,
}: {
  children: ReactNode;
  goalId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: DeleteGoalWithAllInfo,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      queryClient.invalidateQueries();
    },
  });
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#151515]">
          <DropdownMenuItem
            className="flex_center w-full cursor-pointer bg-red-500 text-white hover:bg-red-600"
            onClick={() => mutate(goalId)}
          >
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="flex_center cursor-pointer text-gray-300">
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DeleteAction;
