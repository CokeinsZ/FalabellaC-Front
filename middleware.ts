import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); 

  const isAuth = !!token; // ejemplo simple
  const { pathname } = req.nextUrl;

  // rutas protegidas
  if (pathname.startsWith("/cart") && !isAuth) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*"], 
};
