"use client";

import React, { FormEvent, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/server/actions/user.action";
import { clientSideErrorShow, clientSideMessageShow } from "@/components/data";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/shared/Logo";
import SubmitButton from "@/components/auth/SubmitButton";

const SignInForm: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isPending, mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      if (message) router.push("/");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg p-6">
      <Logo />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="auth_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="text-end">
          <Link href={"/forgot-password"}>
            {" "}
            <span className="mr-1 text-sm text-gray-300">forgot password</span>
          </Link>
        </div>
        <SubmitButton
          formtype="Sign In"
          isPending={isPending}
          pendingText="Signing..."
        />
      </form>
    </div>
  );
};

export default SignInForm;
