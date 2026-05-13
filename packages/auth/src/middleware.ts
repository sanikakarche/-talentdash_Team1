import {
  clerkMiddleware,
} from "@clerk/nextjs/server";

const PROTECTED_PATHS = [
  "/admin",
  "/dashboard",
  "/employer",
  "/api/admin",
  "/api/moderation",
  "/api/submit",
];

export const middleware =
  clerkMiddleware(
    async (auth, request) => {
      const pathname =
        request.nextUrl.pathname;

      /*
       * CRITICAL:
       * Public routes must bypass auth entirely
       * to preserve CDN caching.
       */

      const isProtected =
        PROTECTED_PATHS.some(
          (path) =>
            pathname.startsWith(
              path,
            ),
        );

      if (!isProtected) {
        return;
      }

      await auth.protect();
    },
  );