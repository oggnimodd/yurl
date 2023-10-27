import { postRouter } from "./router/post";
import { authRouter } from "./router/auth";
import { linkRouter } from "./router/link";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
