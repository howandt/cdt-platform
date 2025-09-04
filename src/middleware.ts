// src/middleware.ts
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Offentlige ruter (ingen login)
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/ping",
  "/api/heidi-pack",
  "/heidi",
]);

export default clerkMiddleware((auth, req) => {
  // Tillad public routes
  if (isPublicRoute(req)) return NextResponse.next();

  // For alle andre ruter: kræv login
  const { userId } = auth(); // v5: synkron i middleware
  if (!userId) {
    // Redirect til sign-in (bevar destination)
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

export const config = {
  // Match alle app- og API-ruter, men ikke _next og statiske filer
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
