"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Pill, Eye, CheckCircle2 } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getPrescriptions, updatePrescriptionStatus, type Prescription } from "@/services/data";

export default function PharmacyPrescriptionsPage() {
  const router = useRouter();
  const session = getSession();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [viewing, setViewing] = useState<Prescription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { router.push("/login"); return; }
    setPrescriptions(getPrescriptions().filter((p) => p.status === "Pending" || p.status === "Processing"));
    setLoading(false);
  }, [session, router]);

  const handleDispense = (id: string) => {
    setPrescriptions(updatePrescriptionStatus(id, "Dispensed"));
    if (viewing?.id === id) {
      setViewing({ ...viewing, status: "Dispensed" });
    }
  };

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
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Medications</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Prescriptions</h1>
        <p className="mt-2 text-sm text-slate-500">Process and dispense prescriptions.</p>
      </div>

      <div className="space-y-4">
        {prescriptions.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Pill size={32} className="mx-auto text-slate-300" />
            <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">No prescriptions</h2>
            <p className="mt-2 text-sm text-slate-500">No prescriptions pending processing.</p>
          </div>
        ) : (
          prescriptions.map((rx) => (
            <div key={rx.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl font-semibold text-slate-950">{rx.doctorName}</h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${rx.status === "Dispensed" || rx.status === "Completed" ? "bg-emerald-50 text-emerald-700" : rx.status === "Processing" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                      {rx.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-cyan-700">{rx.diagnosis}</p>
                  <p className="mt-1 text-xs text-slate-400">{new Date(rx.createdAt).toLocaleDateString()} · {rx.medicines.length} medicine{rx.medicines.length === 1 ? "" : "s"}</p>
                </div>
                <button type="button" onClick={() => setViewing(rx)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                  <Eye size={14} />
                  View details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="rx-title">
          <button type="button" aria-label="Close" onClick={() => setViewing(null)} className="absolute inset-0 bg-slate-950/50" />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Prescription</p>
                <h2 id="rx-title" className="font-display mt-1 text-2xl font-semibold text-slate-950">{viewing.doctorName}</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${viewing.status === "Dispensed" || viewing.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {viewing.status}
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-semibold text-slate-500">Diagnosis</p>
                <p className="mt-1 text-sm text-slate-800">{viewing.diagnosis}</p>
              </div>
              {viewing.notes && (
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold text-slate-500">Notes</p>
                  <p className="mt-1 text-sm text-slate-800">{viewing.notes}</p>
                </div>
              )}
              <div>
                <p className="text-xs font-semibold text-slate-500">Medicines</p>
                <div className="mt-3 space-y-3">
                  {viewing.medicines.map((med) => (
                    <div key={med.id} className="rounded-xl border border-slate-100 p-4">
                      <p className="text-sm font-semibold text-slate-800">{med.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{med.dosage} · {med.frequency} · {med.duration}</p>
                      {med.instructions && <p className="mt-1 text-xs text-slate-400">{med.instructions}</p>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {viewing.status !== "Dispensed" && viewing.status !== "Completed" && (
              <button type="button" onClick={() => handleDispense(viewing.id)} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700">
                <CheckCircle2 size={16} />
                Mark as Dispensed
              </button>
            )}
            <button type="button" onClick={() => setViewing(null)} className="mt-3 h-11 w-full rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              Close
            </button>
          </div>
        </div>
      )}
    </RoleShell>
  );
}
