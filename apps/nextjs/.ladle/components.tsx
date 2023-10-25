import React, { FC, useLayoutEffect, useState } from "react";
import type { GlobalProvider } from "@ladle/react";
import { NextUIProvider } from "@nextui-org/react";
import { playgroundTrpc } from "../playground/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ClerkProvider } from "@clerk/clerk-react";
import superjson from "superjson";

import "../src/styles/globals.css";
import "./style.css";
import { getCookie } from "./utils";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const ProviderBuilder: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    playgroundTrpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:8080/trpc",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              Authorization: `Bearer ${getCookie("__session")}`,
            };
          },
        }),
      ],
      transformer: superjson,
    }),
  );

  return (
    <playgroundTrpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider>{children}</NextUIProvider>
      </QueryClientProvider>
    </playgroundTrpc.Provider>
  );
};

export const Provider: GlobalProvider = ({ children, globalState }) => {
  const theme = globalState.theme;

  useLayoutEffect(() => {
    const body = document.body;

    if (theme === "dark") {
      body.classList.remove("light");
      body.classList.add("dark");
    } else if (theme === "light") {
      body.classList.remove("dark");
      body.classList.add("light");
    }
  }, [theme]);

  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ProviderBuilder>
        <div className={theme}>{children}</div>
      </ProviderBuilder>
    </ClerkProvider>
  );
};
