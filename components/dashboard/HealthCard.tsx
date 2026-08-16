import Image from "next/image";
import {
  BadgeCheck,
  Lock,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { getUser } from "@/lib/dashboardStorage";

export default function HealthCard() {
  const user = getUser();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Card header */}
      <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-slate-50/60 px-6 py-5">
        <div className="flex items-center gap-3">
          <Image
            src="/Logo.png"
            alt="HealthO"
            width={40}
            height={40}
            className="h-9 w-auto object-contain"
          />

          <div>
            <p className="font-display text-lg font-semibold leading-none text-slate-950">
              HealthO
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
              Digital Health Identity
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          <BadgeCheck size={14} />
          Verified
        </span>
      </div>

      {/* Identity */}
      <div className="px-6 pt-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-display text-2xl font-semibold text-white">
            {user.initials}
          </div>

          <div className="min-w-0">
            <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-slate-950">
              {user.name}
            </h2>

            <p className="mt-1 font-mono text-xs text-slate-500">
              Patient ID: {user.patientId}
            </p>

            <p className="mt-0.5 font-mono text-xs text-slate-400">
              Card No: {user.cardNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Personal details */}
      <div className="mt-6 grid grid-cols-3 gap-px border-y border-slate-100 bg-slate-100">
        <Detail label="Date of Birth" value={user.dateOfBirth} />
        <Detail label="Blood Group" value={user.bloodGroup} />
        <Detail label="Gender" value={user.gender} />
      </div>

      {/* Health information */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-2">
          <ShieldCheck size={15} className="text-cyan-700" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Health Information
          </h3>
        </div>

        <div className="mt-4 space-y-3">
          <HealthRow label="Allergies" value="None" />
          <HealthRow label="Conditions" value="None" />
          <HealthRow label="Medications" value="None" />
        </div>
      </div>

      {/* Verification footer */}
      <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <Stethoscope size={16} />
          </span>

          <div>
            <p className="text-xs font-semibold text-slate-800">
              Verified by {user.verifiedBy}
            </p>
            <p className="text-[11px] text-slate-400">
              Last verified: {user.verifiedAt}
            </p>
          </div>
        </div>

        <p className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
          <Lock size={12} />
          Verified information
        </p>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-4 py-3">
      <p className="text-[10px] uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}

function HealthRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-800">{value}</span>
    </div>
  );
}