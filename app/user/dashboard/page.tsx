import {
  Activity,
  CalendarDays,
  ClipboardList,
  FileText,
  HeartPulse,
  Pill,
} from "lucide-react";

import UserSidebar from "@/components/layout/UserSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatCard from "@/components/dashboard/StartCard";
import AppointmentCard from "@/components/dashboard/AppointmentCard";

export default function UserDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Sidebar */}
      <UserSidebar />

      {/* Main */}
      <div className="lg:pl-64">

        <DashboardHeader />

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

          {/* Welcome */}
          <section className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8">
            <div className="max-w-2xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400">
                Good evening
              </p>

              <h2 className="font-display mt-3 text-3xl font-semibold sm:text-4xl">
                Welcome back, Lucky.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
                Here&apos;s a quick overview of your healthcare activity.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Book appointment
              </button>

              <button
                type="button"
                className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View records
              </button>
            </div>
          </section>

          {/* Stats */}
          <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label="Appointments"
              value="03"
              description="2 completed · 1 upcoming"
              icon={CalendarDays}
            />

            <StatCard
              label="Prescriptions"
              value="02"
              description="1 active prescription"
              icon={Pill}
            />

            <StatCard
              label="Lab reports"
              value="04"
              description="Latest report 5 days ago"
              icon={ClipboardList}
            />

            <StatCard
              label="Health records"
              value="08"
              description="Your saved medical records"
              icon={FileText}
            />
          </section>

          {/* Main grid */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">

            <div>
              <AppointmentCard />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                    Health snapshot
                  </p>

                  <h3 className="font-display mt-2 text-2xl font-semibold text-slate-950">
                    Your health
                  </h3>
                </div>

                <HeartPulse
                  size={22}
                  className="text-cyan-700"
                />
              </div>

              <div className="mt-6 space-y-4">
                <HealthRow
                  label="Blood pressure"
                  value="120 / 80"
                  status="Normal"
                />

                <HealthRow
                  label="Heart rate"
                  value="72 bpm"
                  status="Normal"
                />

                <HealthRow
                  label="Blood sugar"
                  value="96 mg/dL"
                  status="Normal"
                />

                <HealthRow
                  label="Activity"
                  value="6,420 steps"
                  status="Good"
                />
              </div>
            </div>
          </section>

          {/* Recent activity */}
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                  Activity
                </p>

                <h3 className="font-display mt-2 text-2xl font-semibold text-slate-950">
                  Recent activity
                </h3>
              </div>

              <Activity
                size={21}
                className="text-slate-400"
              />
            </div>

            <div className="mt-6 divide-y divide-slate-100">
              <ActivityRow
                title="Appointment confirmed"
                description="Dr. Arjun Sharma · Cardiology"
                time="Today"
              />

              <ActivityRow
                title="Lab report uploaded"
                description="Complete Blood Count"
                time="5 days ago"
              />

              <ActivityRow
                title="Prescription added"
                description="Dr. Arjun Sharma"
                time="8 days ago"
              />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

type HealthRowProps = {
  label: string;
  value: string;
  status: string;
};

function HealthRow({
  label,
  value,
  status,
}: HealthRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-4 last:border-0 last:pb-0">
      <div>
        <p className="text-sm font-medium text-slate-700">
          {label}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {status}
        </p>
      </div>

      <p className="font-mono text-sm font-medium text-slate-950">
        {value}
      </p>
    </div>
  );
}

type ActivityRowProps = {
  title: string;
  description: string;
  time: string;
};

function ActivityRow({
  title,
  description,
  time,
}: ActivityRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-center gap-4">
        <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-600" />

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-slate-800">
            {title}
          </p>

          <p className="mt-1 truncate text-xs text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <span className="shrink-0 font-mono text-[10px] text-slate-400">
        {time}
      </span>
    </div>
  );
}