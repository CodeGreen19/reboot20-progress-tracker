import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type CustomBtn = {
  children: React.ReactNode;
  onClick?: () => void;
  isPending?: boolean;
  className?: string;
  type?: "submit";
  disable?: boolean;
};
const CustomBtn = ({
  className,
  isPending,
  onClick,
  children,
  type,
  disable,
}: CustomBtn) => {
  return (
    <Button
      disabled={disable || isPending}
      className={cn("min-w-28", className)}
      type={type}
      onClick={onClick}
    >
      {isPending ? (
        <span className="loader_animation">
          <Loader className="" />
        </span>
      ) : (
        children
      )}
    </Button>
  );
};

export default CustomBtn;
