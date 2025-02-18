import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// Define which routes should be public (accessible without authentication)
const isPublicRoute = createRouteMatcher([
  "/",
  "/events/:id",
  "/api/webhook/clerk",
  "/api/webhook/stripe",
  "/api/uploadthing",
  "/sign-in", // ✅ Clerk sign-in page must be public
  "/sign-up", // ✅ Clerk sign-up page must be public
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId, redirectToSignIn } = await auth();

  // ✅ Allow images, static files, and Next.js internals to load
  const url = req.nextUrl.pathname;
  if (url.startsWith("/_next") || url.startsWith("/favicon.ico") || url.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|woff2?|ttf)$/)) {
    return NextResponse.next();
  }

  // ✅ Prevent infinite redirect for Clerk sign-in/sign-up pages
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // ✅ If user is NOT signed in and tries to access a private route, redirect to sign-in
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/(api|trpc)(.*)"], // ✅ Ensures middleware runs correctly
};
