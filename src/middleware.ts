// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  // Kun disse ruter er offentlige; alt andet forbliver beskyttet som før
  publicRoutes: ["/", "/api/ping", "/api/heidi-pack", "/heidi"],
});

// Matcher: alle app-sider og alle API-ruter, men ikke _next og statiske filer
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api)(.*)",
  ],
};
