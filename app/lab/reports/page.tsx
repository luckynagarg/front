"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Eye, Upload } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getLabReports, type LabReport } from "@/services/data";

export default function LabReportsPage() {
  const router = useRouter();
  const session = getSession();
  const [reports, setReports] = useState<LabReport[]>([]);
  const [viewing, setViewing] = useState<LabReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { router.push("/login"); return; }
    setReports(getLabReports());
    setLoading(false);
  }, [session, router]);

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
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Documents</p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Lab Reports</h1>
          <p className="mt-2 text-sm text-slate-500">Upload and manage lab reports.</p>
        </div>
        <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
          <Upload size={16} />
          Upload Report
        </button>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <FileText size={32} className="mx-auto text-slate-300" />
            <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">No reports</h2>
            <p className="mt-2 text-sm text-slate-500">No lab reports uploaded yet.</p>
          </div>
        ) : (
          reports.map((report) => (
            <div key={report.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-display text-xl font-semibold text-slate-950">{report.testName}</h2>
                  <p className="mt-1 text-sm text-slate-500">{report.reportType}</p>
                  <p className="mt-1 text-xs text-slate-400">{report.date} · {report.fileName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${report.status === "Reviewed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                    {report.status}
                  </span>
                  <button type="button" onClick={() => setViewing(report)} className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-semibold text-slate-700 transition hover:bg-slate-50">
                    <Eye size={14} />
                    View
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="report-title">
          <button type="button" aria-label="Close" onClick={() => setViewing(null)} className="absolute inset-0 bg-slate-950/50" />
          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Report</p>
                <h2 id="report-title" className="font-display mt-1 text-2xl font-semibold text-slate-950">{viewing.testName}</h2>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${viewing.status === "Reviewed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                {viewing.status}
              </span>
            </div>
            <dl className="mt-6 space-y-4">
              <Row label="Type" value={viewing.reportType} />
              <Row label="Date" value={viewing.date} />
              <Row label="File" value={viewing.fileName} />
              {viewing.notes && <Row label="Notes" value={viewing.notes} />}
            </dl>
            <button type="button" onClick={() => setViewing(null)} className="mt-6 h-11 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800">
              Close
            </button>
          </div>
        </div>
      )}
    </RoleShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  );
}
