import { appRouter } from "./node/root";
import { createTRPCContext } from "./node/trpc";
import express from "express";
import cors from "cors";
import { renderTrpcPanel } from "trpc-panel";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const PORT = 8080;

const app = express();

app.use(cors());

// Custom middleware function to check authentication
app.use(ClerkExpressWithAuth());

app.use("/panel", ({ res }) => {
  res?.setHeader("Content-Type", "text/html");
  res?.send(
    renderTrpcPanel(appRouter, {
      url: `http://localhost:${PORT}/trpc`,
      transformer: "superjson",
    }),
  );
});

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: createTRPCContext as any,
  }),
);

app.listen(PORT, function () {
  console.log(`server is running on port ${PORT}`);
});
