"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Pill,
  ClipboardList,
  History,
  Bell,
} from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import {
  getPrescriptions,
  getNotifications,
  seedDataIfEmpty,
  type Prescription,
  type Notification,
} from "@/services/data";

export default function PharmacyDashboard() {
  const session = getSession();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { window.location.href = "/login"; return; }
    seedDataIfEmpty();
    setPrescriptions(getPrescriptions().filter((p) => p.status === "Pending" || p.status === "Processing").slice(0, 5));
    setNotifications(getNotifications("PHARM-001").slice(0, 5));
    setLoading(false);
  }, [session]);

  if (loading) {
    return (
      <RoleShell role="PHARMACIST">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-700" />
        </div>
      </RoleShell>
    );
  }

  return (
    <RoleShell role="PHARMACIST">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Welcome back</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Pharmacy Dashboard</h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Process prescriptions and manage orders.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction href="/pharmacy/prescriptions" label="Prescriptions" icon={Pill} />
        <QuickAction href="/pharmacy/orders" label="Orders" icon={ClipboardList} />
        <QuickAction href="/pharmacy/history" label="History" icon={History} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]">
        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Active</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-slate-950">Pending prescriptions</h3>
              </div>
              <Link href="/pharmacy/prescriptions" className="text-sm font-semibold text-cyan-700 hover:text-cyan-800">View all</Link>
            </div>
            <div className="mt-5 divide-y divide-slate-100">
              {prescriptions.length === 0 ? (
                <div className="py-8 text-center">
                  <Pill className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">No pending prescriptions</p>
                </div>
              ) : (
                prescriptions.map((rx) => (
                  <div key={rx.id} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">{rx.doctorName}</p>
                      <p className="mt-1 text-xs text-slate-500">{rx.diagnosis} · {rx.medicines.length} medicine{rx.medicines.length === 1 ? "" : "s"}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${rx.status === "Processing" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                      {rx.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <Bell size={20} />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Alerts</p>
                <h3 className="font-display mt-1 text-xl font-semibold text-slate-950">Notifications</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {notifications.length === 0 ? (
                <p className="text-sm text-slate-500">No notifications</p>
              ) : (
                notifications.map((note) => (
                  <div key={note.id} className={`rounded-xl border p-4 ${note.read ? "border-slate-100 bg-white" : "border-cyan-200 bg-cyan-50/40"}`}>
                    <p className="text-sm font-semibold text-slate-800">{note.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{note.message}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </RoleShell>
  );
}

function QuickAction({ href, label, icon: Icon }: { href: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-600 hover:bg-cyan-50/40">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
        <Icon size={18} />
      </span>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
    </Link>
  );
}
