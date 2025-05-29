import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const hasToken = req.cookies.has("access_token");

  console.log("Middleware cookies:", req.cookies.getAll());

  if (!hasToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

//Rutas protegidas
export const config = {
  matcher: ["/main/:path*"], //Puedes agregar mas rutas protegidas
};
