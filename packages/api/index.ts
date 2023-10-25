import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type AppRouter } from "./src/root";

// Next JS
export { createTRPCContext } from "./src/trpc";
export type { AppRouter } from "./src/root";
export { appRouter } from "./src/root";
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

// Playground (ladle js)
export { createTRPCContext as createPlaygroundTRPCContext } from "./playground/trpc";
import type { AppRouter as PlaygroundAppRouter } from "./playground/root";
export { appRouter as playgroundAppRouter } from "./playground/root";
export type PlaygroundRouterInputs = inferRouterInputs<PlaygroundAppRouter>;
export type PlaygroundRouterOutputs = inferRouterOutputs<PlaygroundAppRouter>;
