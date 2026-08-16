"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BadgeCheck,
  CalendarDays,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Stethoscope,
} from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getDoctor } from "@/services/data";

export default function DoctorProfilePage() {
  const router = useRouter();
  const session = getSession();
  const [doctor, setDoctor] = useState(getDoctor("DOC-001"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { router.push("/login"); return; }
    setDoctor(getDoctor("DOC-001"));
    setLoading(false);
  }, [session, router]);

  if (loading || !doctor) {
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
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Account</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">My Profile</h1>
        <p className="mt-2 text-sm text-slate-500">Your professional profile and details.</p>
      </div>

      {/* Profile header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 text-3xl font-semibold text-white">
            {doctor.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-950">{doctor.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{doctor.specialization} · {doctor.hospital}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <BadgeCheck size={13} />
                Verified Professional
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 font-mono text-[10px] text-slate-500">
                ID: {doctor.id}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Professional information */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <SectionHeading icon={Stethoscope} title="Professional information" description="Your medical qualifications and details." />
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <ReadOnlyField label="Full name" value={doctor.name} />
          <ReadOnlyField label="Specialization" value={doctor.specialization} />
          <ReadOnlyField label="Qualification" value={doctor.qualification} />
          <ReadOnlyField label="Experience" value={doctor.experience} />
          <ReadOnlyField label="Hospital / Clinic" value={doctor.hospital} icon={MapPin} />
          <ReadOnlyField label="Registration ID" value={doctor.registrationId} />
        </div>
      </section>

      {/* Contact */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <SectionHeading icon={Phone} title="Contact information" description="How HealthO can reach you." />
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <ReadOnlyField label="Email" value={doctor.email} icon={Mail} />
          <ReadOnlyField label="Phone number" value={doctor.phone} icon={Phone} />
        </div>
      </section>

      {/* Notice */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600">
          <Lock size={17} />
        </span>
        <div>
          <p className="text-sm font-semibold text-slate-800">Verified information</p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Your verified professional information can only be updated by authorized administrators.
          </p>
        </div>
      </div>
    </RoleShell>
  );
}

function SectionHeading({ icon: Icon, title, description }: { icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; title: string; description: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-cyan-50 p-2.5 text-cyan-700">
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value, icon: Icon }: { label: string; value: string; icon?: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }> }) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
        {label}
        <ShieldCheck size={13} className="text-emerald-600" />
      </p>
      <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800">
        {Icon ? <Icon size={17} strokeWidth={1.8} className="mr-3 shrink-0 text-slate-400" /> : null}
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}
