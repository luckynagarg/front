"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginAs } from "@/lib/auth";
import { ROLES, getRoleConfig, type Role } from "@/lib/roles";
import Input from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("PATIENT");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!name.trim() || !password.trim()) {
      setError("Please enter your name and password.");
      return;
    }

    // Frontend-only mock authentication.
    loginAs(name.trim(), role);
    router.push(getRoleConfig(role).home);
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left */}
        <section className="hidden flex-col justify-between p-10 lg:flex">
          <Link
            href="/"
            className="font-display text-2xl font-semibold text-white"
          >
            HealthO
          </Link>

          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Healthcare / Connected
            </p>
            <h1 className="font-display mt-5 text-6xl font-semibold leading-tight text-white">
              One platform.
              <br />
              Every role.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
              Patients, doctors, hospitals, laboratories and pharmacies —
              connected through one secure healthcare ecosystem.
            </p>
          </div>

          <p className="font-mono text-xs text-slate-600">HEALTHO / 2026</p>
        </section>

        {/* Right */}
        <section className="flex items-center justify-center bg-slate-50 px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link
                href="/"
                className="font-display text-2xl font-semibold text-slate-950 lg:hidden"
              >
                HealthO
              </Link>

              <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-cyan-700">
                Welcome back
              </p>
              <h2 className="font-display mt-3 text-4xl font-semibold text-slate-950">
                Sign in to HealthO
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue to your healthcare workspace.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <Input
                id="name"
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
              />

              <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
              />

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Account type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map((item) => {
                    const active = role === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setRole(item)}
                        className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition ${
                          active
                            ? "border-cyan-600 bg-cyan-50 text-cyan-800"
                            : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        {getRoleConfig(item).label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {error && (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 flex items-center justify-between text-sm">
              <Link
                href="/forgot-password"
                className="font-semibold text-cyan-700 hover:text-cyan-800"
              >
                Forgot password?
              </Link>

              <Link
                href="/signup"
                className="font-semibold text-slate-600 hover:text-slate-950"
              >
                Create account
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}