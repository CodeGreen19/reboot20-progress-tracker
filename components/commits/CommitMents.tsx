import { format } from "date-fns";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeCommit } from "@/server/actions/commits.action";
import { clientSideErrorShow } from "../data";

let confirmWord = "surely, i have fullfilled my commitment";
const CommitMents = ({
  text,
  date,
  isDone,
  commitId,
}: {
  text: string;
  date: Date;
  isDone: boolean;
  commitId: string;
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["commit-update"],
    mutationFn: completeCommit,
    onSuccess: () => {
      setInputText("");
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (confirmWord !== inputText) {
      return clientSideErrorShow("write the text correctly");
    }
    mutate({ id: commitId! });
  };
  return (
    <div
      className={`mt-2 rounded-lg p-3 px-4 ${isDone ? "bg-gray-900" : "bg-stone-900"}`}
    >
      <h1
        className={`mb-2 font-bold ${isDone ? "text-gray-500" : "text-purple-600"}`}
      >
        {format(date, "PPP")}
      </h1>
      <p className={`${isDone ? "text-gray-400" : "text-gray-300"}`}>
        <span className="text-white">commitment : </span> {text}
      </p>
      <div>
        <div className="flex w-full items-center justify-end">
          {isDone ? (
            <Button className="text-green-500">completed</Button>
          ) : (
            <Button
              onClick={() => setOpen(!isOpen)}
              variant={"ghost"}
              className="text-blue-500 underline hover:bg-transparent hover:text-blue-700"
            >
              {isOpen ? "Close" : "Done"}
            </Button>
          )}
        </div>
        {isOpen && (
          <>
            {" "}
            <p className="my-2 text-gray-400">
              write: <span>{confirmWord}</span>
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between"
            >
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                type="text"
                className="w-full"
              />
              <Button
                disabled={isPending}
                type="submit"
                className="bg-green-800"
              >
                submit
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CommitMents;
