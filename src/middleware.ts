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

export default clerkMiddleware(async (auth, req) => {
  // Tillad public routes uden login
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // For alle andre ruter: kræv login
  const a = await auth();        // ← VIGTIGT: await
  const { userId } = a;

  if (!userId) {
    // Simpel redirect til sign-in og bevar destination
    const url = new URL("/sign-in", req.url);
    url.searchParams.set("redirect_url", req.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
});

// Match alle app- og API-ruter, men ikke _next og statiske filer
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
