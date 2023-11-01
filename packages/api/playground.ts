import { trpc } from "@elysiajs/trpc";
import { Elysia } from "elysia";
import { appRouter } from "./node/root";
import { clerkPlugin } from "./node/plugins/clerk";
import { cors } from "@elysiajs/cors";
import { createTRPCContext } from "./node/trpc";
import { renderTrpcPanel } from "trpc-panel";

const PORT = 8080;

const app = new Elysia()
  .use(cors())
  .use(clerkPlugin())
  .get("/panel", ({ set }) => {
    set.headers["Content-Type"] = "text/html";
    return renderTrpcPanel(appRouter, {
      url: `http://localhost:${PORT}/trpc`,
      transformer: "superjson",
    });
  })
  .use(
    trpc(appRouter, {
      createContext: createTRPCContext,
    }),
  )
  .listen(PORT);

console.log(`server is running on port ${PORT}`);
