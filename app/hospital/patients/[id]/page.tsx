"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CalendarDays, FileText, Pill, AlertTriangle } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import {
  getPatient,
  getAllergies,
  getPrescriptions,
  getLabReports,
  getAppointments,
  seedDataIfEmpty,
  type Allergy,
  type Prescription,
  type LabReport,
  type Appointment,
} from "@/services/data";

export default function HospitalPatientDetailPage() {
  const params = useParams();
  const session = getSession();
  const [patient, setPatient] = useState(getPatient(params.id as string));
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [reports, setReports] = useState<LabReport[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { window.location.href = "/login"; return; }
    seedDataIfEmpty();
    const p = getPatient(params.id as string);
    setPatient(p);
    if (p) {
      setAllergies(getAllergies(p.id));
      setPrescriptions(getPrescriptions(p.id));
      setReports(getLabReports(p.id));
      setAppointments(getAppointments({ patientId: p.id }));
    }
    setLoading(false);
  }, [session, params.id]);

  if (loading) {
    return (
      <RoleShell role="HOSPITAL">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-700" />
        </div>
      </RoleShell>
    );
  }

  if (!patient) {
    return (
      <RoleShell role="HOSPITAL">
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <h1 className="font-display text-2xl font-semibold text-slate-950">Patient not found</h1>
          <Link href="/hospital/patients" className="mt-4 inline-flex h-11 items-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white hover:bg-slate-800">
            Back to patients
          </Link>
        </div>
      </RoleShell>
    );
  }

  return (
    <RoleShell role="HOSPITAL">
      <div className="mb-8">
        <Link href="/hospital/patients" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800">
          ← Back to patients
        </Link>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-display text-2xl font-semibold text-white">
            {patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold text-slate-950">{patient.name}</h1>
            <p className="mt-1 text-lg text-slate-500">{patient.gender} · {patient.dateOfBirth} · {patient.bloodGroup}</p>
            <p className="mt-1 text-sm text-slate-400">{patient.email} · {patient.phone}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]">
        <div className="min-w-0 space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Safety</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-slate-950">Allergies</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {allergies.length === 0 ? (
                <p className="text-sm text-slate-500">No allergies recorded</p>
              ) : (
                allergies.map((allergy) => (
                  <div key={allergy.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{allergy.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{allergy.type} · {allergy.reaction}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${allergy.severity === "Severe" ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"}`}>
                      {allergy.severity}
                    </span>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">History</p>
                <h3 className="font-display mt-2 text-xl font-semibold text-slate-950">Medical history</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {reports.length === 0 ? (
                <p className="text-sm text-slate-500">No medical history available</p>
              ) : (
                reports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between rounded-xl border border-slate-100 p-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{report.testName}</p>
                      <p className="mt-1 text-xs text-slate-500">{report.reportType} · {report.date}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${report.status === "Reviewed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                      {report.status}
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
                <CalendarDays size={20} />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Schedule</p>
                <h3 className="font-display mt-1 text-xl font-semibold text-slate-950">Appointments</h3>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              {appointments.length === 0 ? (
                <p className="text-sm text-slate-500">No appointments</p>
              ) : (
                appointments.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="rounded-xl border border-slate-100 p-4">
                    <p className="text-sm font-semibold text-slate-800">{apt.date}</p>
                    <p className="mt-1 text-xs text-slate-500">{apt.time} · {apt.status}</p>
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
