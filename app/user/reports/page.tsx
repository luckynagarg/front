"use client";

import { useMemo, useState } from "react";
import { FileText, Search } from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import VerificationBadge from "@/components/dashboard/VerificationBadge";
import ReportUploadModal from "@/components/dashboard/ReportUploadModal";
import { getReports } from "@/lib/dashboardStorage";
import type { MedicalReport } from "@/lib/dashboardData";

const typeFilters = ["All Types", "Diagnostic Report", "Lab Report", "Imaging Report", "Prescription", "Consultation Summary", "Other"];

export default function ReportsPage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewing, setViewing] = useState<MedicalReport | null>(null);
  const [reports, setReports] = useState(getReports());

  const filtered = useMemo(() => {
    return reports.filter((report) => {
      const matchesQuery =
        !query.trim() ||
        report.title.toLowerCase().includes(query.toLowerCase()) ||
        report.fileName.toLowerCase().includes(query.toLowerCase());
      const matchesType =
        typeFilter === "All Types" || report.type === typeFilter;
      return matchesQuery && matchesType;
    });
  }, [reports, query, typeFilter]);

  return (
    <DashboardShell>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
            Documents
          </p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
            My Reports
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Uploaded medical reports and documents.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Add New Report
        </button>
      </div>

      {/* Search + filter */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search reports..."
            aria-label="Search reports"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          aria-label="Filter by report type"
          className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 sm:w-56"
        >
          {typeFilters.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {filtered.map((report) => (
          <div
            key={report.id}
            className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <FileText size={22} />
            </span>

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-slate-900">
                {report.title}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{report.type}</p>
              <p className="mt-1 font-mono text-xs text-slate-400">
                {report.date} · {report.fileName}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <VerificationBadge status={report.verification.status} />

              <button
                type="button"
                onClick={() => setViewing(report)}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <FileText size={32} className="mx-auto text-slate-300" />
          <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">
            No reports found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {reports.length === 0
              ? "No reports uploaded yet. Add your first medical report."
              : "Try adjusting your search or filter."}
          </p>
        </div>
      )}

      <ReportUploadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdded={() => setReports(getReports())}
      />

      {/* View modal */}
      {viewing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="view-report-title"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setViewing(null)}
            className="absolute inset-0 bg-slate-950/50"
          />

          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                  Report details
                </p>
                <h2
                  id="view-report-title"
                  className="font-display mt-1 text-2xl font-semibold text-slate-950"
                >
                  {viewing.title}
                </h2>
              </div>

              <VerificationBadge status={viewing.verification.status} />
            </div>

            <dl className="mt-6 space-y-4">
              <Row label="Type" value={viewing.type} />
              <Row label="Date" value={viewing.date} />
              <Row label="File" value={viewing.fileName} />
              {viewing.notes && <Row label="Notes" value={viewing.notes} />}
              {viewing.verification.verifiedBy && (
                <Row
                  label="Verified by"
                  value={`${viewing.verification.verifiedBy} · ${viewing.verification.verifiedAt}`}
                />
              )}
            </dl>

            <button
              type="button"
              onClick={() => setViewing(null)}
              className="mt-6 h-11 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-semibold text-slate-800">
        {value}
      </dd>
    </div>
  );
}