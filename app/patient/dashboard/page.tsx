"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Pill,
  FileText,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
  Bell,
} from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import {
  getAppointments,
  getPrescriptions,
  getLabReports,
  getAllergies,
  getNotifications,
  seedDataIfEmpty,
  type Appointment,
  type Prescription,
  type LabReport,
  type Allergy,
  type Notification,
} from "@/services/data";

export default function PatientDashboard() {
  const router = useRouter();
  const session = getSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [reports, setReports] = useState<LabReport[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }

    seedDataIfEmpty();

    const patientId = "PAT-001";
    setAppointments(getAppointments({ patientId }).slice(0, 3));
    setPrescriptions(getPrescriptions(patientId).slice(0, 3));
    setReports(getLabReports(patientId).slice(0, 3));
    setAllergies(getAllergies(patientId));
    setNotifications(getNotifications("PAT-001").slice(0, 5));
    setLoading(false);
  }, [session, router]);

  if (loading) {
    return (
      <RoleShell role="PATIENT">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-700" />
        </div>
      </RoleShell>
    );
  }

  const upcomingAppointments = appointments.filter((a) =>
    ["Confirmed", "Upcoming"].includes(a.status)
  );
  const activePrescriptions = prescriptions.filter((p) =>
    ["Pending", "Processing"].includes(p.status)
  );
  const severeAllergies = allergies.filter(
    (a) => a.severity === "Severe" && a.status === "Active"
  );
  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <RoleShell role="PATIENT">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
          Welcome back
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
          My Health Dashboard
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Here&apos;s your health overview, {session?.name ?? "User"}.
        </p>
      </div>

      {/* Alerts */}
      {severeAllergies.length > 0 && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-red-800">
                Severe Allergy Alert
              </p>
              <p className="mt-1 text-xs leading-5 text-red-700">
                You have {severeAllergies.length} active severe allergy{" "}
                {severeAllergies.length === 1 ? "record" : "records"}. Please
                review your allergy information.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <QuickAction
          href="/patient/appointments/book"
          label="Book Appointment"
          icon={CalendarDays}
        />
        <QuickAction
          href="/patient/doctors"
          label="Find Doctor"
          icon={ArrowUpRight}
        />
        <QuickAction
          href="/patient/reports"
          label="View Reports"
          icon={FileText}
        />
        <QuickAction
          href="/patient/prescriptions"
          label="Prescriptions"
          icon={Pill}
        />
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]">
        <div className="min-w-0 space-y-6">
          {/* Upcoming Appointments */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                  Schedule
                </p>
                <h3 className="font-display mt-2 text-xl font-semibold text-slate-950">
                  Upcoming appointments
                </h3>
              </div>
              <Link
                href="/patient/appointments"
                className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
              >
                View all
              </Link>
            </div>

            <div className="mt-5 divide-y divide-slate-100">
              {upcomingAppointments.length === 0 ? (
                <div className="py-8 text-center">
                  <CalendarDays className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">
                    No upcoming appointments
                  </p>
                  <Link
                    href="/patient/appointments/book"
                    className="mt-3 inline-flex h-10 items-center rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Book Appointment
                  </Link>
                </div>
              ) : (
                upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {apt.participantName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {apt.date} · {apt.time}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        apt.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Recent Reports */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                  Documents
                </p>
                <h3 className="font-display mt-2 text-xl font-semibold text-slate-950">
                  Recent reports
                </h3>
              </div>
              <Link
                href="/patient/reports"
                className="text-sm font-semibold text-cyan-700 hover:text-cyan-800"
              >
                View all
              </Link>
            </div>
            <div className="mt-5 divide-y divide-slate-100">
              {reports.length === 0 ? (
                <div className="py-8 text-center">
                  <FileText className="mx-auto h-10 w-10 text-slate-300" />
                  <p className="mt-3 text-sm text-slate-500">
                    No reports uploaded yet
                  </p>
                </div>
              ) : (
                reports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {report.testName}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {report.reportType} · {report.date}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        report.status === "Reviewed"
                          ? "bg-emerald-50 text-emerald-700"
                          : report.status === "Uploaded" ||
                            report.status === "Under Review"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Right Sidebar */}
        <div className="min-w-0 space-y-6">
          {/* Active Prescriptions */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <Pill size={20} />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                  Medications
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold text-slate-950">
                  Active prescriptions
                </h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {activePrescriptions.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No active prescriptions
                </p>
              ) : (
                activePrescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="rounded-xl border border-slate-100 p-4"
                  >
                    <p className="text-sm font-semibold text-slate-800">
                      {rx.doctorName}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {rx.medicines.length} medicine
                      {rx.medicines.length === 1 ? "" : "s"} · {rx.status}
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Allergies */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <AlertTriangle size={20} />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                  Safety
                </p>
                <h3 className="font-display mt-1 text-xl font-semibold text-slate-950">
                  Allergies
                </h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {allergies.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No allergies recorded
                </p>
              ) : (
                allergies.map((allergy) => (
                  <div
                    key={allergy.id}
                    className="flex items-center justify-between rounded-xl border border-slate-100 p-4"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {allergy.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {allergy.type} · {allergy.reaction}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        allergy.severity === "Severe"
                          ? "bg-red-50 text-red-700"
                          : allergy.severity === "Moderate"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {allergy.severity}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Notifications */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                  <Bell size={20} />
                </span>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                    Alerts
                  </p>
                  <h3 className="font-display mt-1 text-xl font-semibold text-slate-950">
                    Notifications
                  </h3>
                </div>
              </div>
              {unreadNotifications.length > 0 && (
                <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-700">
                  {unreadNotifications.length}
                </span>
              )}
            </div>
            <div className="mt-5 space-y-3">
              {notifications.length === 0 ? (
                <p className="text-sm text-slate-500">No notifications</p>
              ) : (
                notifications.map((note) => (
                  <div
                    key={note.id}
                    className={`rounded-xl border p-4 ${
                      note.read
                        ? "border-slate-100 bg-white"
                        : "border-cyan-200 bg-cyan-50/40"
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-800">
                      {note.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {note.message}
                    </p>
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

function QuickAction({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-600 hover:bg-cyan-50/40"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
        <Icon size={18} />
      </span>
      <span className="text-sm font-semibold text-slate-800">{label}</span>
    </Link>
  );
}
