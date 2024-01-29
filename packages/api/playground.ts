import { trpcServer } from "@hono/trpc-server";
import { Hono } from "hono";
import { appRouter } from "../api/node";
import { clerkMiddleware } from "@hono/clerk-auth";
import { cors } from "hono/cors";
import { createTRPCContext } from "./node/trpc";
import { renderTrpcPanel } from "trpc-panel";

const PORT = 8080;

const API_URL = "";

const app = new Hono()
  .use("*", cors())
  .use("*", clerkMiddleware())
  .get("/panel", (c) => {
    return c.html(
      renderTrpcPanel(appRouter, {
        url: `http://localhost:${PORT}/trpc`,
        transformer: "superjson",
      }),
    );
  })
  .use(
    `${API_URL}/trpc/*`,
    trpcServer({
      router: appRouter,
      createContext: createTRPCContext,
    }),
  );

export default {
  port: PORT,
  fetch: app.fetch,
};
