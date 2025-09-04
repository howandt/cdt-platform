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
  // Offentlige ruter: giv bare lov at fortsætte
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  // Alt andet: beskyt som normalt
  auth().protect();
  return NextResponse.next();
});

export const config = {
  // Match alle app- og API-ruter, men ikke _next og statiske filer
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
