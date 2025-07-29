import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refresh_token")?.value;
  console.log(request.cookies.getAll());
  console.log("token", token);
  const { pathname } = request.nextUrl;
  const isAuth = !!token;

  const isPrivateRoute = pathname.startsWith("/app");
  const isAuthPage = pathname.startsWith("/auth");

  console.log(
    isAuth,
    isPrivateRoute,
    request.url,
    new URL("/auth", request.url),
    "url"
  );
  if (!isAuth && isPrivateRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
