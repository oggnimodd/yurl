import { createTRPCReact } from "@trpc/react-query";
import { playgroundAppRouter } from "@acme/api";

export const api = createTRPCReact<typeof playgroundAppRouter>();
