"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock3, MapPin, Video, X } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import {
  getAppointments,
  cancelAppointment,
  type Appointment,
} from "@/services/data";

export default function LabAppointmentsPage() {
  const router = useRouter();
  const session = getSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [cancelling, setCancelling] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { router.push("/login"); return; }
    setAppointments(getAppointments({ labId: "LAB-001" }));
    setLoading(false);
  }, [session, router]);

  const handleCancel = () => {
    if (!cancelling) return;
    setAppointments(cancelAppointment(cancelling.id));
    setCancelling(null);
  };

  if (loading) {
    return (
      <RoleShell role="LAB">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-700" />
        </div>
      </RoleShell>
    );
  }

  return (
    <RoleShell role="LAB">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Schedule</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Lab Appointments</h1>
        <p className="mt-2 text-sm text-slate-500">Manage lab test appointments.</p>
      </div>

      <div className="space-y-4">
        {appointments.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <CalendarDays size={32} className="mx-auto text-slate-300" />
            <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">No appointments</h2>
            <p className="mt-2 text-sm text-slate-500">No lab appointments scheduled.</p>
          </div>
        ) : (
          appointments.map((appointment) => {
            const cancelled = appointment.status === "Cancelled";
            return (
              <div key={appointment.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-display text-lg font-semibold text-white">
                    {appointment.participantName.split(" ").map((word) => word[0]).slice(0, 2).join("")}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-xl font-semibold text-slate-950">{appointment.participantName}</h2>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cancelled ? "bg-slate-100 text-slate-500" : appointment.status === "Confirmed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                        {appointment.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-cyan-700">{appointment.participantRole}</p>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5"><CalendarDays size={14} />{appointment.date}</span>
                      <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{appointment.time}</span>
                      <span className="inline-flex items-center gap-1.5">{appointment.type === "Video consultation" ? <Video size={14} /> : <MapPin size={14} />}{appointment.type}</span>
                    </div>
                  </div>
                  {!cancelled && (
                    <button type="button" onClick={() => setCancelling(appointment)} className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {cancelling && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="cancel-title">
          <button type="button" aria-label="Close" onClick={() => setCancelling(null)} className="absolute inset-0 bg-slate-950/50" />
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 id="cancel-title" className="font-display text-xl font-semibold text-slate-950">Cancel appointment?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Are you sure you want to cancel this appointment?</p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setCancelling(null)} className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Keep</button>
              <button type="button" onClick={handleCancel} className="h-11 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </RoleShell>
  );
}
