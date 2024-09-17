"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { clientSideErrorShow, clientSideMessageShow } from "../data";

import { addUrine } from "@/server/actions/urine.action";
import { useRouter } from "next/navigation";

const AddUrin = ({ children }: { children: ReactNode }) => {
  const route = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addUrine,
    onSuccess: ({ error, message }) => {
      if (error) return clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      queryClient.invalidateQueries({ queryKey: ["urineInfo"] });
    },
  });
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-2">
            {isPending ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              children
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="justify-end space-y-2 bg-[#151515]">
          <DropdownMenuItem
            onClick={() => mutate()}
            className="flex_center w-full cursor-pointer bg-amber-500 text-white hover:bg-amber-600"
          >
            Add Urin
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => route.push("/urine/analytics")}
            className="flex_center w-full cursor-pointer bg-green-500 text-white hover:bg-green-600"
          >
            analytics
          </DropdownMenuItem>
          <DropdownMenuItem className="flex_center cursor-pointer text-gray-300 hover:bg-black">
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AddUrin;
