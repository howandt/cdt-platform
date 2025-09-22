// src/middleware.ts
import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Offentlige ruter (ingen login krævet)
const isPublicRoute = createRouteMatcher([
  "/",
  "/start",
  "/dashboard",
  "/api/ping",
  "/api/heidi-pack",
  "/heidi",
  "/heidi-chat",
]);

export default clerkMiddleware(async (auth, req) => {
  // Tillad adgang til offentlige ruter uden login
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For alle andre ruter: kræv login
  const { userId } = await auth();

  if (!userId) {
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

// Matcher alt undtagen statiske filer
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};