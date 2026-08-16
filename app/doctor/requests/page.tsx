"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, CheckCircle2 } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getNotifications, markNotificationRead, type Notification } from "@/services/data";

export default function DoctorRequestsPage() {
  const router = useRouter();
  const session = getSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { router.push("/login"); return; }
    setNotifications(getNotifications("DOC-001"));
    setLoading(false);
  }, [session, router]);

  const handleMarkRead = (id: string) => {
    setNotifications(markNotificationRead(id));
  };

  if (loading) {
    return (
      <RoleShell role="DOCTOR">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-700" />
        </div>
      </RoleShell>
    );
  }

  return (
    <RoleShell role="DOCTOR">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Alerts</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Requests & Notifications</h1>
        <p className="mt-2 text-sm text-slate-500">Patient requests and system notifications.</p>
      </div>

      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Bell size={32} className="mx-auto text-slate-300" />
            <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">No notifications</h2>
            <p className="mt-2 text-sm text-slate-500">You&apos;re all caught up.</p>
          </div>
        ) : (
          notifications.map((note) => (
            <div key={note.id} className={`rounded-2xl border p-6 ${note.read ? "border-slate-200 bg-white" : "border-cyan-200 bg-cyan-50/40"}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg font-semibold text-slate-950">{note.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{note.message}</p>
                  <p className="mt-2 text-xs text-slate-400">{new Date(note.createdAt).toLocaleString()}</p>
                </div>
                {!note.read && (
                  <button type="button" onClick={() => handleMarkRead(note.id)} className="inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 px-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                    <CheckCircle2 size={14} />
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </RoleShell>
  );
}
