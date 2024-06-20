"use client";
import { createUser } from "@/server/actions/user.action";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

import { clientSideErrorShow, clientSideMessageShow } from "@/components/data";
import Logo from "@/components/shared/Logo";
import SubmitButton from "@/components/auth/SubmitButton";

const SignupForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { isPending, mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      if (message) router.push("/");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ name, email, password });
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg p-6">
      <Logo />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="auth_input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <SubmitButton
          isPending={isPending}
          pendingText="creating..."
          formtype="Sign Up"
        />
      </form>
    </div>
  );
};

export default SignupForm;
