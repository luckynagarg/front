"use client";

import { useRouter } from "next/navigation";
import { loginAs } from "@/lib/auth";
import { getRoleConfig, type Role } from "@/lib/roles";

const ROLES: Role[] = ["PATIENT", "DOCTOR", "HOSPITAL", "LAB", "PHARMACIST"];

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: Role) => {
    loginAs("Harry", role);
    router.push(getRoleConfig(role).home);
    router.refresh();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-sm text-center">
        <h1 className="font-display text-4xl font-semibold text-white">HealthO</h1>
        <p className="mt-2 text-sm text-slate-400">Demo login — select a role to continue as Harry</p>

        <div className="mt-8 space-y-3">
          {ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleLogin(role)}
              className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 text-sm font-semibold text-white transition hover:border-cyan-600 hover:bg-slate-800"
            >
              {getRoleConfig(role).label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
