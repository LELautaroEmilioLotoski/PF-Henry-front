import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("Middleware executing...");
  console.log("Token from cookies:", token);

  if (!token) {
    console.log("No token found, redirecting to /login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Verifica si el token es una cadena válida
  if (typeof token !== 'string') {
    console.log("Invalid token format, redirecting to /login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
    console.log("Decoded Token:", payload);

    const userRoles = payload.roles;
    console.log("User Roles:", userRoles);

    // Verifica si el usuario tiene el rol adecuado
    if (!userRoles || (!userRoles.includes("admin") && !userRoles.includes("worker"))) {
      console.log("User is not authorized, redirecting to /profile.");
      return NextResponse.redirect(new URL("/profile", req.url));
    }

  } catch (error) {
    console.error("Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }

  console.log("User authorized, proceeding to requested page.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*"],
};