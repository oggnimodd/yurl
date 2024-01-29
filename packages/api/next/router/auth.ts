import { createTRPCRouter, protectedProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
});
