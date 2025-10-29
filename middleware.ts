import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); 

  const isAuth = !!token; // ejemplo simple
  const { pathname } = req.nextUrl;

  // rutas protegidas
  if (pathname.startsWith("/cart") && !isAuth) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
  if (pathname.startsWith("/seller")) {
  const userId = req.cookies.get("user_id");
  const nit = req.cookies.get("nit");
  if (!userId || !nit) {
    return NextResponse.redirect(new URL("/Vende-en-Falabella", req.url));
  }
}

  if (pathname.startsWith("/Vende-en-Falabella")) {
  const userId = req.cookies.get("user_id");
  const nit = req.cookies.get("nit");
  if (userId || nit) {
    return NextResponse.redirect(new URL("/seller", req.url));
  }
}

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/seller/:path*", "/Vende-en-Falabella/:path*"],
};
