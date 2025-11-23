import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get("admin_auth")?.value === "true";

  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!isLoggedIn && !request.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(
        new URL("/login?redirect=/admin", request.url)
      );
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
