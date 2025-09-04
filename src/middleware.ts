// src/middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Offentlige ruter (ingen login)
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/ping",
  "/api/heidi-pack",
  "/heidi",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    // Tillad uden login
    return;
  }
  // Alle andre ruter beskyttes som før (inkl. 30-min logik i din app)
  auth().protect();
});

export const config = {
  // Match alle app- og API-ruter, men ikke _next og statiske filer
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
