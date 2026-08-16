// Frontend auth service for HealthO.
// Client-side session is for UX only — a real backend must enforce
// authentication and authorization. This layer is designed so it can be
// swapped for Firebase Auth / REST API / any backend later.

import type { Role } from "./roles";
import { getRoleConfig } from "./roles";

const SESSION_KEY = "healtho_session";

export interface SessionUser {
  name: string;
  role: Role;
  email?: string;
}

function readSession(): SessionUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    // Backward compatibility: old system stored boolean true/false.
    if (raw === "true") {
      return { name: "User", role: "PATIENT" };
    }
    const parsed = JSON.parse(raw) as SessionUser;
    if (parsed && typeof parsed.name === "string" && parsed.role) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeSession(user: SessionUser | null): void {
  if (typeof window === "undefined") return;
  try {
    if (user) {
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(SESSION_KEY);
    }
  } catch {
    // Ignore storage errors.
  }
}

export function getSession(): SessionUser | null {
  return readSession();
}

export function isAuthenticated(): boolean {
  return readSession() !== null;
}

export function getRole(): Role | null {
  return readSession()?.role ?? null;
}

export function loginAs(name: string, role: Role): SessionUser {
  const user: SessionUser = { name, role };
  writeSession(user);
  return user;
}

export function signupAs(
  name: string,
  role: Role,
  email?: string,
): SessionUser {
  const user: SessionUser = { name, role, email };
  writeSession(user);
  return user;
}

export function logout(): void {
  writeSession(null);
}

export function getHomePath(role: Role): string {
  return getRoleConfig(role).home;
}

export function redirectPathForRole(role: Role): string {
  return getRoleConfig(role).home;
}