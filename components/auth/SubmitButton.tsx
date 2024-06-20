import React from "react";
import { Button } from "../ui/button";

const SubmitButton = ({
  isPending,
  pendingText,
  formtype,
}: {
  isPending: boolean;
  pendingText: string;
  formtype: "Sign Up" | "Sign In" | "Send Mail" | "Confirm";
}) => {
  return (
    <div className="flex_center">
      <Button
        type="submit"
        disabled={isPending}
        className="mt-3 rounded-3xl px-12 py-6 hover:bg-black"
      >
        {isPending ? pendingText : formtype}
      </Button>
    </div>
  );
};

export default SubmitButton;
