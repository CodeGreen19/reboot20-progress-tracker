"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { ReactNode, useState } from "react";

const ReactQuery = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
};

export default ReactQuery;
