// src/middleware.ts
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Offentlige ruter
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/ping",
  "/api/heidi-pack",
  "/heidi",
]);

export default clerkMiddleware(async (auth, req) => {
  // Tillad offentlige ruter
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }
  // Beskyt alle andre
  const a = await auth();       // ← await det asynkrone auth()
  return a.protect();           // ← nu findes .protect()
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
