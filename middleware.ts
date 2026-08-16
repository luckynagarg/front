import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession, redirectPathForRole } from "@/lib/auth";
import { getRoleConfig } from "@/lib/roles";

const PUBLIC_ROUTES = ["/login", "/signup", "/"];
const SIGNUP_ROUTES = [
  "/signup/patient",
  "/signup/doctor",
  "/signup/hospital",
  "/signup/lab",
  "/signup/pharmacy",
];

function isPublicRoute(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) return true;
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) return true;
  return false;
}

function isSignupRoute(pathname: string): boolean {
  return SIGNUP_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );
}

function getRoleFromPath(pathname: string): string | null {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;
  const roleMap: Record<string, string> = {
    patient: "PATIENT",
    doctor: "DOCTOR",
    hospital: "HOSPITAL",
    lab: "LAB",
    pharmacy: "PHARMACIST",
  };
  return roleMap[segments[0]] ?? null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = getSession();

  if (isPublicRoute(pathname)) {
    if (session && (pathname === "/login" || pathname === "/signup")) {
      const roleHome = redirectPathForRole(session.role);
      return NextResponse.redirect(new URL(roleHome, request.url));
    }
    return NextResponse.next();
  }

  if (isSignupRoute(pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const pathRole = getRoleFromPath(pathname);
  if (pathRole && pathRole !== session.role) {
    const config = getRoleConfig(session.role);
    return NextResponse.redirect(new URL(config.home, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|images|favicon).*)"],
};
