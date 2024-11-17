"use client";

import React, { ChangeEvent, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiary } from "@/server/actions/diary.action";
import { clientSideErrorShow } from "../data";
import { Input } from "../ui/input";
import Image from "next/image";
import { Delete, Upload } from "lucide-react";
import { uploadImg } from "@/server/data/upload_img";
import CustomBtn from "../shared/CustomBtn";

const CreateNewDiary = ({ children }: { children: React.ReactNode }) => {
  const [text, setText] = useState<string>("");
  // for images
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadReadyImg, setUploadReadyImg] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["diary-update"],
    mutationFn: createDiary,
    onSuccess: () => {
      setText("");
      setPreview(null);
      setUploadReadyImg(null);
      queryClient.invalidateQueries({ queryKey: ["diaries"] });
    },
  });

  // submit handler
  const handleSubmit = () => {
    if (text.split(" ").length < 5) {
      return clientSideErrorShow("add at least 5 word");
    }
    mutate({ text, imageUrl: uploadReadyImg });
  };

  // handle file selection
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] || null;
    if (file) {
      //for file
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setUploadReadyImg(e.target.result);
          setPreview(URL.createObjectURL(file)); // Generate preview
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="max-h-[80vh] min-h-[500px] overflow-y-auto bg-stone-900">
          <DialogHeader>
            <DialogTitle>{format(new Date(), "PPPP")}</DialogTitle>
            <DialogDescription>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="mt-4 h-[250px] w-full resize-none rounded-md bg-[#212121] p-4 text-slate-200 outline-none"
                placeholder="create new text.."
              ></textarea>
              {!preview && (
                <div className="relative flex h-16 w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-blue-900/80 bg-gray-900/35 hover:border-blue-900 hover:bg-gray-900/55">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="">Upload Image</div>{" "}
                  <Upload className="text-xs" />
                </div>
              )}
              {preview && (
                <div className="relative w-full">
                  <Image
                    src={preview}
                    height={400}
                    width={400}
                    alt="previewImg"
                    className="w-full rounded-md"
                  />
                  <Delete
                    className="absolute right-0 top-0 m-2 text-red-500"
                    onClick={() => {
                      setPreview(null);
                      setUploadReadyImg(null);
                    }}
                  />
                </div>
              )}
            </DialogDescription>
            <DialogFooter>
              <div className="flex w-full items-center justify-center">
                <CustomBtn
                  onClick={handleSubmit}
                  disable={isPending}
                  isPending={isPending}
                  className="mt-4 bg-black hover:bg-black"
                >
                  Create
                </CustomBtn>
              </div>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateNewDiary;
