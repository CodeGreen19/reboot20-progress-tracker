"use client";

import { clientSideErrorShow, clientSideMessageShow } from "@/components/data";
import { Button } from "@/components/ui/button";
import { createCommits } from "@/server/actions/commits.action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const CrateCommit = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [text, setText] = useState<string>("");
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-commit"],
    mutationFn: createCommits,
    onSuccess: ({ message, error }) => {
      if (error) return clientSideErrorShow(error);
      clientSideMessageShow(message!);
      setText("");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/profile");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ id: params.id!, text });
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="mt-4 min-h-44 w-full rounded-lg bg-black p-4"
        placeholder="enter commitments here..."
      ></textarea>
      <div className="my-3 flex items-center justify-center">
        <Button type="submit" disabled={isPending}>
          Create
        </Button>
      </div>
    </form>
  );
};

export default CrateCommit;
