"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiary } from "@/server/actions/diary.action";
import { clientSideErrorShow } from "../data";

const CreateNewDiary = ({ children }: { children: React.ReactNode }) => {
  const [text, setText] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["diary-update"],
    mutationFn: createDiary,
    onSuccess: () => {
      setText("");
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });
  const handleSubmit = () => {
    if (text.split(" ").length < 5) {
      return clientSideErrorShow("add at least 5 word");
    }
    mutate(text);
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="min-h-[500px] bg-stone-900">
          <DialogHeader>
            <DialogTitle>{format(new Date(), "PPPP")}</DialogTitle>
            <DialogDescription>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-4 h-[250px] w-full rounded-md bg-[#212121] p-4 text-slate-200 outline-none"
                placeholder="create new text.."
              ></textarea>
            </DialogDescription>
            <DialogFooter>
              <div className="flex w-full items-center justify-center">
                <Button
                  onClick={handleSubmit}
                  disabled={isPending}
                  className="mt-4 bg-black hover:bg-black"
                >
                  Create
                </Button>
              </div>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewDiary;
