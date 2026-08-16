"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarDays, MapPin } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getDoctor } from "@/services/data";

export default function PatientDoctorDetailPage() {
  const params = useParams();
  const session = getSession();
  const doctor = getDoctor(params.id as string);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { window.location.href = "/login"; return; }
    setLoading(false);
  }, [session]);

  if (loading) {
    return (
      <RoleShell role="PATIENT">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-700" />
        </div>
      </RoleShell>
    );
  }

  if (!doctor) {
    return (
      <RoleShell role="PATIENT">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <h1 className="font-display text-2xl font-semibold text-slate-950">Doctor not found</h1>
          <Link href="/patient/doctors" className="mt-4 inline-flex h-11 items-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
            Back to doctors
          </Link>
        </div>
      </RoleShell>
    );
  }

  return (
    <RoleShell role="PATIENT">
      <div className="mb-8">
        <Link href="/patient/doctors" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800">
          ← Back to doctors
        </Link>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-display text-2xl font-semibold text-white">
            {doctor.initials || doctor.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold text-slate-950">{doctor.name}</h1>
            <p className="mt-1 text-lg text-cyan-700">{doctor.specialization}</p>
            <p className="mt-1 text-sm text-slate-500">{doctor.qualification} · {doctor.experience}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h3 className="font-display text-xl font-semibold text-slate-950">About</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="flex items-center gap-2"><MapPin size={16} className="text-slate-400" /> {doctor.hospital}</p>
            <p>{doctor.qualification}</p>
            <p>{doctor.experience} of experience</p>
            <p>Registration ID: {doctor.registrationId}</p>
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Book</p>
          <h2 className="font-display mt-2 text-2xl font-semibold text-slate-950">Book appointment</h2>
          <p className="mt-2 text-sm text-slate-500">Schedule a consultation with {doctor.name}.</p>
          <Link href={`/patient/appointments/book?doctor=${doctor.id}`} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800">
            Book Appointment
          </Link>
        </aside>
      </div>
    </RoleShell>
  );
}
