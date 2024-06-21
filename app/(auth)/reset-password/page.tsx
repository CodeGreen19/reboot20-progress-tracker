"use client";

import SubmitButton from "@/components/auth/SubmitButton";
import Logo from "@/components/shared/Logo";
import { clientSideErrorShow, clientSideMessageShow } from "@/components/data";
import { resetPassword } from "@/server/actions/user.action";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const ResetPassword = () => {
  const params = useSearchParams();
  let token = params.get("token");
  const router = useRouter();

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: ({ error, message }) => {
      clientSideErrorShow(error);
      if (message) clientSideMessageShow(message);
      if (message) router.push("/sign-in");
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (token) {
      mutate({ token, newPass: newPassword, confirmPass: confirmPassword });
    }
  };

  return (
    <div className="mx-auto mt-8 max-w-md rounded-lg p-6">
      <Logo />
      <form onSubmit={handleSubmit}>
        <p className="mb-4 text-center text-gray-400">
          Enter your email to get a password reset link in your mailbox
        </p>

        <input
          type="password"
          placeholder="New Password"
          className="auth_input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="auth_input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <SubmitButton
          formtype="Confirm"
          isPending={isPending}
          pendingText="Updating..."
        />
      </form>
    </div>
  );
};

export default ResetPassword;