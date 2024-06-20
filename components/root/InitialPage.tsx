import React from "react";
import Logo from "../shared/Logo";

const InitialPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo />

      <div className="px-4 text-sm text-gray-400">
        Rebirth date 20 june 2024
      </div>
    </div>
  );
};

export default InitialPage;
