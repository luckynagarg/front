"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, X } from "lucide-react";
import { getRoleConfig, type Role } from "@/lib/roles";
import { getSession, logout } from "@/lib/auth";

export default function RoleShell({
  role,
  children,
}: {
  role: Role;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const config = getRoleConfig(role);
  const session = getSession();

  const handleLogout = () => {
    logout();
    router.push("/login");
    router.refresh();
  };

  const nav = (
    <nav className="flex-1 space-y-1 overflow-y-auto p-4">
      <p className="mb-3 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
        {config.label}
      </p>

      {config.nav.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== config.home && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            aria-current={active ? "page" : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-slate-950 text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link href={config.home} className="flex items-center gap-2.5">
            <Image
              src="/Logo.png"
              alt="HealthO"
              width={40}
              height={40}
              className="h-9 w-auto object-contain"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-slate-950">
              Health<span className="text-cyan-700">O</span>
            </span>
          </Link>
        </div>
        {nav}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-slate-950/50"
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-xl">
            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
              <Link
                href={config.home}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
              >
                <Image
                  src="/Logo.png"
                  alt="HealthO"
                  width={40}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
                <span className="font-display text-xl font-semibold tracking-tight text-slate-950">
                  Health<span className="text-cyan-700">O</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>
            {nav}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
            >
              <Menu size={20} />
            </button>

            <Link
              href={config.home}
              className="flex items-center gap-2.5 lg:hidden"
            >
              <Image
                src="/Logo.png"
                alt="HealthO"
                width={40}
                height={40}
                className="h-9 w-auto object-contain"
              />
              <span className="font-display text-xl font-semibold tracking-tight text-slate-950">
                Health<span className="text-cyan-700">O</span>
              </span>
            </Link>
          </div>

          <div className="hidden lg:block">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
              {config.label}
            </p>
            <h1 className="font-display mt-1 text-xl font-semibold text-slate-950">
              {config.description}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-full bg-slate-100 py-1.5 pl-1.5 pr-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                {session?.name?.charAt(0).toUpperCase() ?? "U"}
              </span>
              <span className="hidden text-sm font-medium text-slate-700 sm:block">
                {session?.name ?? "User"}
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}