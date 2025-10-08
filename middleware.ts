import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token"); 

  const isAuth = !!token; // ejemplo simple
  const { pathname } = req.nextUrl;

  // rutas protegidas
  if (pathname.startsWith("/cart") && !isAuth) {
    return NextResponse.redirect(new URL("/SignUp", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*"], 
};
