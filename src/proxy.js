import { NextResponse } from "next/server";

import { getSessionCookie } from "better-auth/cookies";

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/register",
  "/doctors",
];

function isPublicPath(pathname) {
  if (PUBLIC_ROUTES.includes(pathname)) {
    return true;
  }

  if (pathname.startsWith("/doctors/")) {
    return true;
  }

  return false;
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "redirect",
      pathname
    );
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
