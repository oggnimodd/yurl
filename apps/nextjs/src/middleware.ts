import { authMiddleware } from "@clerk/nextjs";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { Link } from "@prisma/client";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up", "/s/"],
  debug: false,
  afterAuth: async (auth, req: NextRequest, event: NextFetchEvent) => {
    const isSlugUrl = req.nextUrl.pathname.indexOf("/s/") === 0;

    if (isSlugUrl) {
      // Get pathname:
      const slug = req.nextUrl.pathname.split("/").pop();

      // Get data from query:
      const data = await fetch(`${req.nextUrl.origin}/api/url/${slug}`);

      // Return (/) if not found (404):
      if (data.status === 404) {
        return NextResponse.redirect(req.nextUrl.origin);
      }

      // Convert data to JSON:
      const dataToJson = (await data.json()) as Link;

      if (data?.url) {
        return NextResponse.redirect(new URL(dataToJson.url));
      }
    }

    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)", "/s/:slug*"],
};
