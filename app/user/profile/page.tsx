import {
  BadgeCheck,
  CalendarDays,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import { getUser } from "@/lib/dashboardStorage";

export default function UserProfilePage() {
  const user = getUser();

  return (
    <DashboardShell>
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
          Account
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
          My Profile
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Your verified personal and healthcare information.
        </p>
      </div>

      {/* Profile header */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 text-3xl font-semibold text-white">
            {user.initials}
          </div>

          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-950">
              {user.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Patient · HealthO member
            </p>

            <div className="mt-3 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <BadgeCheck size={13} />
                Verified by {user.verifiedBy}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 font-mono text-[10px] text-slate-500">
                ID: {user.patientId}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Personal information */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <SectionHeading
          icon={UserRound}
          title="Personal information"
          description="Your basic personal details."
        />

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <ReadOnlyField label="Full name" value={user.name} />
          <ReadOnlyField label="Date of birth" value={user.dateOfBirth} />
          <ReadOnlyField label="Gender" value={user.gender} />
          <ReadOnlyField label="Blood group" value={user.bloodGroup} />
        </div>
      </section>

      {/* Contact */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <SectionHeading
          icon={Phone}
          title="Contact information"
          description="How HealthO can reach you."
        />

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <ReadOnlyField label="Email" value={user.email} icon={Mail} />
          <ReadOnlyField label="Phone number" value={user.phone} icon={Phone} />
        </div>
      </section>

      {/* Address */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <SectionHeading
          icon={MapPin}
          title="Address"
          description="Your current residential address."
        />

        <div className="mt-7">
          <ReadOnlyField label="Address" value={user.address} icon={MapPin} />
        </div>
      </section>

      {/* Account */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <SectionHeading
          icon={CalendarDays}
          title="Account"
          description="Your HealthO account details."
        />

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <ReadOnlyField label="Patient ID" value={user.patientId} />
          <ReadOnlyField label="Account created" value={user.accountCreated} />
        </div>
      </section>

      {/* Notice */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600">
          <Lock size={17} />
        </span>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            Verified information
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Your verified profile information can only be updated by an
            authorized healthcare professional.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-cyan-50 p-2.5 text-cyan-700">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function ReadOnlyField({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
        {label}
        <ShieldCheck size={13} className="text-emerald-600" />
      </p>

      <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800">
        {Icon ? (
          <Icon
            size={17}
            strokeWidth={1.8}
            className="mr-3 shrink-0 text-slate-400"
          />
        ) : null}
        <span className="truncate">{value}</span>
      </div>
    </div>
  );
}