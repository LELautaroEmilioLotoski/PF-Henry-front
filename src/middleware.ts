import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";
import { JwtPayload } from "./interfaces/Types";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  console.log("Middleware executing...");
  console.log("Token from cookies:", token);

  if (!token) {
    console.log("No token found, redirecting to /login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (typeof token !== 'string') {
    console.log("Invalid token format, redirecting to /login.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const { payload }: { payload: JWTPayload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET as string));
    console.log("Decoded Token:", payload);

    const payloadWithRoles = payload as unknown;

    if ((payloadWithRoles as JwtPayload).roles) {
      const userRoles = (payloadWithRoles as JwtPayload).roles;
      console.log("User Roles:", userRoles);

      if (!userRoles || userRoles.length === 0) {
        console.log("User has no roles, redirecting to /profile.");
        return NextResponse.redirect(new URL("/profile", req.url));
      }

      if (userRoles.includes("worker")) {
        if (req.nextUrl.pathname.startsWith("/admin")) {
          console.log("Worker not authorized for admin routes, redirecting to /employee/dashboard.");
          return NextResponse.redirect(new URL("/employee/dashboard", req.url)); // Redirigir a /employee/dashboard
        }
        console.log("Worker authorized for employee routes.");
      }

      if (userRoles.includes("admin")) {
        console.log("Admin authorized for both admin and employee routes.");
      }

      if (!userRoles.includes("admin") && !userRoles.includes("worker")) {
        console.log("User not authorized for these routes, redirecting to /profile.");
        return NextResponse.redirect(new URL("/profile", req.url));
      }
    } else {
      console.log("No roles found in token, redirecting to /profile.");
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