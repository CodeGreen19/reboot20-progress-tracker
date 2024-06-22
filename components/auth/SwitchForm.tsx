import Link from "next/link";
import React from "react";

const SwitchForm = ({ pathname }: { pathname: string }) => {
  return (
    <div
      className={`fixed bottom-0 flex h-16 w-full max-w-xl items-center justify-around rounded-tl-3xl rounded-tr-3xl border-t bg-nav text-gray-400 ${pathname === "/sign-up" || pathname === "/sign-in" ? "" : "hidden"}`}
    >
      {pathname === "/sign-up" ? (
        <Link href={"/sign-in"} className="underline">
          <span className="text-sm">Already have an account sign-in</span>
        </Link>
      ) : (
        <Link href={"/sign-up"} className="underline">
          <span className="text-sm">Don&apos;t have any account sign-up</span>
        </Link>
      )}
    </div>
  );
};

export default SwitchForm;
