"use client";

import SubmitButton from "@/components/auth/SubmitButton";
import Logo from "@/components/shared/Logo";
import { clientSideErrorShow, clientSideMessageShow } from "@/components/data";
import { SendMailToUser } from "@/server/actions/mail.action";
import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: SendMailToUser,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(email);
  };
  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg p-6">
      <Logo />
      <form onSubmit={handleSubmit}>
        <p className="mb-4 text-center text-gray-400">
          enter your email to get password reset link inside your mail box
        </p>
        <input
          type="email"
          placeholder="Email"
          className="auth_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <SubmitButton
          formtype="Send Mail"
          isPending={isPending}
          pendingText="sending...."
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
