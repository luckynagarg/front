"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, Menu } from "lucide-react";
import { getUser, logout } from "@/lib/dashboardStorage";

export default function DashboardHeader({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  const router = useRouter();
  const user = getUser();

  const handleLogout = () => {
    logout();
    router.push("/pages/login");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-5 backdrop-blur sm:px-8">
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={20} />
        </button>

        {/* Logo (mobile only — sidebar shows it on desktop) */}
        <Link
          href="/user/dashboard"
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
          Patient portal
        </p>
        <h1 className="font-display mt-1 text-xl font-semibold text-slate-950">
          My Health
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2.5 rounded-full bg-slate-100 py-1.5 pl-1.5 pr-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
            {user.initials}
          </span>
          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            {user.name}
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
  );
}