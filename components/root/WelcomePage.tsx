"use client";
import Link from "next/link";
import Logo from "../shared/Logo";
import { Button } from "../ui/button";
import cookies from "js-cookie";

const WelcomePage = () => {
  const cookie = cookies.get("user_token");
  console.log(cookie);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo />

      <div className="px-4 text-sm text-gray-400">
        <span>
          Welcome to <span>Reboot20</span>, your ultimate companion for
          achieving your goals. Our app helps you set, track, and reach your
          objectives with ease. Stay organized with customizable milestones,
          visualize your progress with insightful charts, and stay motivated
          with reminders and achievements!{" "}
        </span>
        <p className="my-2">
          If you have an account simple login or sign up to track your progress.
        </p>
      </div>
      <div className="mt-6 w-1/2">
        <div className="flex items-center justify-start">
          <Link href={"/sign-in"}>
            {" "}
            <Button>Sign In</Button>
          </Link>
        </div>
        <div className="relative my-4 w-full border-b">
          {" "}
          <span className="absolute -top-3 left-[42%] rounded-full border bg-main px-2">
            or
          </span>
        </div>
        <div className="flex items-center justify-end">
          <Link href={"/sign-up"}>
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
