"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  ClipboardList,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Pill,
  Search,
  UserRound,
} from "lucide-react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Appointments",
    href: "/user/appointment",
    icon: CalendarDays,
  },
  {
    label: "Find Doctors",
    href: "/user/doctors",
    icon: Search,
  },
  {
    label: "Medical Records",
    href: "/user/medical-records",
    icon: FileText,
  },
  {
    label: "Prescriptions",
    href: "/user/prescriptions",
    icon: Pill,
  },
  {
    label: "Lab Reports",
    href: "/user/lab-reports",
    icon: ClipboardList,
  },
  {
    label: "Profile",
    href: "/user/profile",
    icon: UserRound,
  },
];

export default function UserSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-20 items-center border-b border-slate-100 px-6">
        <Link
          href="/"
          className="font-display text-2xl font-semibold tracking-tight text-slate-950"
        >
          Health<span className="text-cyan-700">O</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <p className="mb-3 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
          Workspace
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/user/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              <Icon size={18} strokeWidth={1.8} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-100 p-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Home size={18} />
          Back to website
        </Link>

        <button
          type="button"
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-red-50 hover:text-red-600"
        >
          <LogOut size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );
}