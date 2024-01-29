import { createNextApiHandler } from "@trpc/server/adapters/next";
import NextCors from "nextjs-cors";
import {
  appRouter,
  createTRPCContext,
} from "../../../../../../packages/api/next";
import { getAuth } from "@clerk/nextjs/server";
import { TRPCError } from "@trpc/server";
import validator from "validator";

const publicRoutes = ["link.singleLink"];

const isPublicRoute = (path: string) => {
  // Sanitize the input to prevent potential injection attacks
  const sanitizedPath = validator
    .escape(path.split("/").slice(3).join("/"))
    .split("?")[0];

  return publicRoutes.some((route) => sanitizedPath === route);
};

const allowCors = (fn: any) => async (req: any, res: any) => {
  // Run the cors middleware
  // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { userId } = getAuth(req);

  if (!userId && !isPublicRoute(req.url)) {
    return res
      .status(401)
      .json(
        new TRPCError({ code: "UNAUTHORIZED", message: "Not authenticated" }),
      );
  }

  return await fn(req, res);
};

// export API handler
const handler = createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
});

export default allowCors(handler);
