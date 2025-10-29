import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useUserCard} from "@/hooks/useUserCard";
import { supabase } from "./lib/supabaseClient";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token"); 
  const { data, error: authError } = await supabase.auth.getUser()
  const isSeller = data?.user?.user_metadata?.isSeller || false;
  const isAuth = !!token; // ejemplo simple
  const { pathname } = req.nextUrl;
  const Seller = !!isSeller;
  
  // rutas protegidas
  if (pathname.startsWith("/cart") && !isAuth) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/seller") && (!isAuth || !Seller)) {
    console.log("isSeller:", Seller);
    return NextResponse.redirect(new URL("/Vende-en-Falabella", req.url));
  }

  if (pathname.startsWith("/Vende-en-Falabella")) {
  const userId = req.cookies.get("user_id");
  const nit = req.cookies.get("nit");
    if (userId && nit) {
      return NextResponse.redirect(new URL("/seller", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/seller/:path*", "/Vende-en-Falabella/:path*"],
};
