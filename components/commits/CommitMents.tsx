import { format } from "date-fns";
import React, { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeCommit } from "@/server/actions/commits.action";
import { clientSideErrorShow } from "../data";

let successText = "surely, i have fullfilled my commitment";
let failedText = "varily, i have failed, i am a looser";

const CommitMents = ({
  text,
  date,
  isFailed,
  isCompleted,
  commitId,
}: {
  text: string;
  date: Date;
  isCompleted: boolean;
  isFailed: boolean;
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
    if (inputText === successText || inputText === failedText) {
      if (inputText === successText) {
        mutate({ id: commitId!, done: true, fail: false });
      } else if (inputText === failedText) {
        mutate({ id: commitId!, done: false, fail: true });
      }
    } else {
      return clientSideErrorShow("write success or failed text correctly");
    }
  };
  return (
    <div
      className={`mt-2 rounded-lg p-3 px-4 ${isCompleted || isFailed ? "bg-gray-900" : "bg-stone-900"}`}
    >
      <h1
        className={`mb-2 font-bold ${isCompleted || isFailed ? "text-gray-500" : "text-purple-600"}`}
      >
        {format(date, "PPP")}
      </h1>
      <p
        className={`${isCompleted || isFailed ? "text-gray-400" : "text-gray-300"}`}
      >
        <span className="text-white">commitment : </span> {text}
      </p>
      <div>
        <div className="flex w-full items-center justify-end">
          {isCompleted ? (
            <Button className="text-green-500">completed</Button>
          ) : isFailed ? (
            <Button className="text-red-500">failed</Button>
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
            <div className="my-2 text-gray-400">
              <p>
                success :{" "}
                <span className="text-green-500">"{successText}"</span>
              </p>{" "}
              <p>
                failed : <span className="text-red-700">"{failedText}"</span>
              </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center justify-between"
            >
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                type="text"
                placeholder="write success or failed text..."
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
