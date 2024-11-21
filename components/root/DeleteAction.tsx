import React, { ReactNode, useRef } from "react";
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
  const divRef = useRef<HTMLDivElement | null>(null);
  const { mutate } = useMutation({
    mutationFn: DeleteGoalWithAllInfo,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      queryClient.invalidateQueries();
    },
  });
  return (
    <div ref={divRef}>
      <DropdownMenu>
        <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
        <DropdownMenuContent
          className="space-y-2 bg-[#050505] transition-all"
          align="end"
        >
          <ul className="p-1 text-center text-sm *:p-2">
            <DropdownMenuItem
              ref={divRef}
              className="m-0 hidden p-0"
            ></DropdownMenuItem>
            <li
              className="cursor-pointer text-green-500"
              onClick={() => divRef.current?.click()}
            >
              Cancel
            </li>

            <li
              className="cursor-pointer rounded-3xl bg-red-500/5 text-red-500"
              onClick={() => mutate(goalId)}
            >
              Delete
            </li>
          </ul>
          {/* <DropdownMenuItem className="flex_center w-full cursor-pointer bg-red-500 p-2 text-white hover:bg-red-600">
            Delete
          </DropdownMenuItem> */}
          {/* <DropdownMenuItem className="flex_center cursor-pointer text-gray-300 hover:bg-transparent">
            Cancel
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DeleteAction;
