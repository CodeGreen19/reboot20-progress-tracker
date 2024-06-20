import { NextRequest, NextResponse } from "next/server";
import { AUTH_ROUTE } from "./routes";
import { authUser } from "./server/actions/user.action";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (AUTH_ROUTE.includes(pathname) && authUser()) {
    return NextResponse.redirect(new URL("/", req.url));
  } else if (
    !AUTH_ROUTE.includes(pathname) &&
    pathname !== "/" &&
    !authUser()
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
