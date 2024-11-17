import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
const ImageExpand = ({
  children,
  img,
}: {
  children: React.ReactNode;
  img: string;
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="max-h-[80vh] min-h-[500px] overflow-y-scroll bg-stone-900">
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <Image
                src={img}
                width={400}
                height={400}
                alt="expand-img"
                className="w-full rounded"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageExpand;
