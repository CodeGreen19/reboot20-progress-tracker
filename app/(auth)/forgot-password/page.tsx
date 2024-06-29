"use client";

import SubmitButton from "@/components/auth/SubmitButton";
import Logo from "@/components/shared/Logo";
import { clientSideErrorShow, clientSideMessageShow } from "@/components/data";
import { SendMailToUser } from "@/server/actions/mail.action";
import { useMutation } from "@tanstack/react-query";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isMailSent, setIsMailSend] = useState<boolean>(false);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: SendMailToUser,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      if (message) setIsMailSend(true);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(email);
  };
  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg p-6">
      <Logo />
      {!isMailSent ? (
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
      ) : (
        <div className="text-center text-white">
          A mail has been sent to {email}, so go to your mail box and click the
          <span className="mx-2 text-center !text-blue-400 text-border shadow-lg">
            Reset password
          </span>{" "}
          button and reset your password, thank you!
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
