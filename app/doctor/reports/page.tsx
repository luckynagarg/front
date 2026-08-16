"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Search, Eye, CheckCircle2 } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getLabReports, updateLabReportStatus, type LabReport } from "@/services/data";

export default function DoctorReportsPage() {
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

  const handleReview = (id: string) => {
    setReports(updateLabReportStatus(id, "Reviewed", "Dr. Alex Verma"));
    if (viewing?.id === id) {
      setViewing({ ...viewing, status: "Reviewed", reviewedBy: "Dr. Alex Verma" });
    }
  };

  if (loading) {
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
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Clinical</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Lab Reports</h1>
        <p className="mt-2 text-sm text-slate-500">Review and manage lab reports.</p>
      </div>

      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <FileText size={32} className="mx-auto text-slate-300" />
            <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">No reports</h2>
            <p className="mt-2 text-sm text-slate-500">No lab reports available.</p>
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
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${report.status === "Reviewed" ? "bg-emerald-50 text-emerald-700" : report.status === "Uploaded" || report.status === "Under Review" ? "bg-amber-50 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
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

      {/* View Modal */}
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
              {viewing.reviewedBy && <Row label="Reviewed by" value={`${viewing.reviewedBy} · ${viewing.reviewedAt ? new Date(viewing.reviewedAt).toLocaleDateString() : ""}`} />}
            </dl>
            {viewing.status !== "Reviewed" && (
              <button type="button" onClick={() => handleReview(viewing.id)} className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-semibold text-white transition hover:bg-emerald-700">
                <CheckCircle2 size={16} />
                Mark as Reviewed
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  );
}
