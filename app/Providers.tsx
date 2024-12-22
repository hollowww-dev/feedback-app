"use client";
import { FilterContextProvider } from "../contexts/FilterContext";
import { NotificationContextProvider } from "../contexts/NotificationContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import getQueryClient from "../lib/getQueryClient";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        <NotificationContextProvider>
          <FilterContextProvider>{children}</FilterContextProvider>
        </NotificationContextProvider>
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
}
