import type {
  ClerkOptions,
  SignedInAuthObject,
  SignedOutAuthObject,
} from "@clerk/clerk-sdk-node";
import { Elysia } from "elysia";
import { clerkClient } from "./clerkClient";
import * as constants from "./constants";

function clerkPlugin(options?: ClerkOptions) {
  const secretKey = options?.secretKey ?? constants.SECRET_KEY;
  const publishableKey = options?.publishableKey ?? constants.PUBLISHABLE_KEY;

  return new Elysia({
    name: "clerk",
    seed: options,
  })
    .decorate("clerk", clerkClient)
    .state("auth", null as null | SignedInAuthObject | SignedOutAuthObject)
    .onBeforeHandle(async ({ request, set, store }) => {
      const requestState = await clerkClient.authenticateRequest({
        ...options,
        secretKey,
        publishableKey,
        request,
      });

      if (requestState.isUnknown) {
        set.status = 401;
        set.headers = {
          [constants.Headers.AuthReason]: requestState.reason,
          [constants.Headers.AuthMessage]: requestState.message,
        };
        return "";
      }

      if (requestState.isInterstitial) {
        const interstitialHtmlPage = clerkClient.localInterstitial({
          publishableKey,
          frontendApi: constants.PUBLISHABLE_KEY,
        });

        set.status = 401;
        set.headers = {
          [constants.Headers.AuthReason]: requestState.reason,
          [constants.Headers.AuthMessage]: requestState.message,
          "Content-Type": "text/html",
        };

        return interstitialHtmlPage;
      }

      store.auth = requestState.toAuth();
    });
}

export { clerkPlugin, type ClerkOptions };
