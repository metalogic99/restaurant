import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (/\.(png|svg|jpg|webp|mp3|geojson|pdf|gif|css)$/.test(pathname)) {
    return;
  }

  if (!JWT_SECRET) {
    return new NextResponse("JWT secret not defined", { status: 500 });
  }
  if (pathname.startsWith("/guest")) {
    return NextResponse.next();
  }
  const token = request.cookies.get("token")?.value;
  const isLoginRoute = pathname.startsWith("/login");
  if (isLoginRoute) {
    NextResponse.next();
    return;
  }
  if (!token) {
    const loginUrl = new URL(`/login`, request.url);
    // const guestURL = new URL(`/guest`, request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    if (!payload) {
      const loginUrl = new URL(`/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }
    if (pathname.startsWith("/admin")) {
      if (payload.role === "admin") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL(`/`, request.url));
      }
    }
    if (pathname.startsWith("/kitchen")) {
      if (payload.role === "admin" || payload.role === "chef") {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    if (pathname.startsWith("/")) {
      if (
        payload.role === "receptionist" ||
        payload.role === "admin" ||
        payload.role === "waiter"
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/kitchen", request.url));
      }
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    const loginUrl = new URL(`/login`, request.url);
    return NextResponse.redirect(loginUrl);
  }
}

//   const originalSearch = request.nextUrl.search;
//   const newUrl = new URL(`/${locale}${pathname}${originalSearch}`, request.url);
//   const response = NextResponse.rewrite(newUrl);
//   response.headers.set("x-locale", locale);
//   return response;

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
