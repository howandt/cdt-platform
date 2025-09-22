// src/middleware.ts - EMERGENCY FIX
import { NextResponse } from "next/server";

export default function middleware() {
  // Disable all authentication temporarily to fix redirect loop
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};