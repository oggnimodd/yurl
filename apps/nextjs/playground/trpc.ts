import { createTRPCReact } from "@trpc/react-query";
import { playgroundAppRouter } from "@acme/api";

export const playgroundTrpc = createTRPCReact<typeof playgroundAppRouter>();
