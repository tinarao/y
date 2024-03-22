"use client"

import { QueryClient, QueryClientProvider, HydrationBoundary } from "@tanstack/react-query";
import { hydrate } from "@tanstack/query-core"
import { ReactNode, useState } from "react";


const QueryClientWrapper = ({ children }: { children: ReactNode }) => {

  const QC = new QueryClient()

  return (
    <QueryClientProvider client={QC}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryClientWrapper;
