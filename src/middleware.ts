import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',               // forside
  '/sign-in(.*)',    // login
  '/sign-up(.*)',    // signup
  '/api/webhooks(.*)'// webhooks (tilladt uden auth)
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect()
  }
})

// VIGTIGT: udeluk /api, _next og statiske filer
export const config = {
  matcher: [
    '/((?!api|_next|.*\\..*).*)',
  ],
}
