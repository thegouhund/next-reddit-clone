"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import RouteChangeListener from "./RouteChangeListener";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Wrapper = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <RouteChangeListener />
        {children}
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Wrapper;
