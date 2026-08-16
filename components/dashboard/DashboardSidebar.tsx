"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  CalendarDays,
  FilePlus2,
  FlaskConical,
  IdCard,
  UserRound,
  X,
} from "lucide-react";
import ReportUploadModal from "./ReportUploadModal";

const menuItems = [
  {
    label: "My Health Card",
    href: "/user/dashboard",
    icon: IdCard,
  },
  {
    label: "My Appointments",
    href: "/user/appointment",
    icon: CalendarDays,
  },
  {
    label: "My Reports",
    href: "/user/reports",
    icon: FilePlus2,
  },
  {
    label: "Lab Registration",
    href: "/user/lab",
    icon: FlaskConical,
  },
  {
    label: "Profile",
    href: "/user/profile",
    icon: UserRound,
  },
];

export default function DashboardSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const [modalOpen, setModalOpen] = useState(false);

  const nav = (
    <nav className="flex-1 space-y-1 overflow-y-auto p-4">
      <p className="mb-3 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
        Patient portal
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
            onClick={onClose}
            aria-current={active ? "page" : undefined}
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
  );

  const addReportButton = (
    <div className="border-t border-slate-100 p-4">
      <button
        type="button"
        onClick={() => {
          setModalOpen(true);
          onClose();
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-800"
      >
        <FilePlus2 size={17} />
        Add New Report
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <Link href="/user/dashboard" className="flex items-center gap-2.5">
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
        {addReportButton}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/50"
          />

          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white shadow-xl">
            <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
              <Link
                href="/user/dashboard"
                onClick={onClose}
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
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {nav}
            {addReportButton}
          </aside>
        </div>
      )}

      <ReportUploadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={() => {
          // Reports are persisted to localStorage; pages read them on render.
        }}
      />
    </>
  );
}