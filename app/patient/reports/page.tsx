"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileText, Search, Plus, Eye, X } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import {
  getLabReports,
  addLabReport,
  type LabReport,
} from "@/services/data";

const typeFilters = [
  "All Types",
  "Lab Report",
  "Imaging Report",
  "Diagnostic Report",
  "Prescription",
  "Consultation Summary",
  "Other",
];

export default function PatientReportsPage() {
  const router = useRouter();
  const session = getSession();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewing, setViewing] = useState<LabReport | null>(null);
  const [reports, setReports] = useState<LabReport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
      return;
    }
    setReports(getLabReports("PAT-001"));
    setLoading(false);
  }, [session, router]);

  const filtered = (() => {
    return reports.filter((report) => {
      const matchesQuery =
        !query.trim() ||
        report.testName.toLowerCase().includes(query.toLowerCase()) ||
        report.fileName.toLowerCase().includes(query.toLowerCase());
      const matchesType =
        typeFilter === "All Types" || report.reportType === typeFilter;
      return matchesQuery && matchesType;
    });
  })();

  const handleAddReport = (report: LabReport) => {
    setReports([report, ...reports]);
    setModalOpen(false);
  };

  if (loading) {
    return (
      <RoleShell role="PATIENT">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-cyan-700" />
        </div>
      </RoleShell>
    );
  }

  return (
    <RoleShell role="PATIENT">
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
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={16} />
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
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search reports..."
            aria-label="Search reports"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
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
                {report.testName}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{report.reportType}</p>
              <p className="mt-1 font-mono text-xs text-slate-400">
                {report.date} · {report.fileName}
              </p>
            </div>
            <div className="flex items-center gap-3">
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

      {/* Upload Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setModalOpen(false)}
            className="absolute inset-0 bg-slate-950/50"
          />
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                  Upload
                </p>
                <h2
                  id="report-modal-title"
                  className="font-display mt-1 text-2xl font-semibold text-slate-950"
                >
                  Add New Report
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>
            <ReportForm onAdded={handleAddReport} onClose={() => setModalOpen(false)} />
          </div>
        </div>
      )}

      {/* View Modal */}
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
                  {viewing.testName}
                </h2>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  viewing.status === "Reviewed"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {viewing.status}
              </span>
            </div>
            <dl className="mt-6 space-y-4">
              <Row label="Type" value={viewing.reportType} />
              <Row label="Date" value={viewing.date} />
              <Row label="File" value={viewing.fileName} />
              {viewing.notes && <Row label="Notes" value={viewing.notes} />}
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
    </RoleShell>
  );
}

function ReportForm({
  onAdded,
  onClose,
}: {
  onAdded: (report: LabReport) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Lab Report");
  const [date, setDate] = useState("");
  const [fileName, setFileName] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) {
      setError("Please enter a report title.");
      return;
    }
    if (!date) {
      setError("Please select a report date.");
      return;
    }
    if (!fileName) {
      setError("Please attach a report file.");
      return;
    }

    onAdded({
      id: nextLabId(),
      patientId: "PAT-001",
      testName: title.trim(),
      reportType: type,
      date,
      fileName,
      notes: notes.trim() || undefined,
      status: "Uploaded",
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-5 px-6 py-6">
      <Field label="Report title">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Blood Test Report"
          className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
        />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Report type">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
          >
            {typeFilters
              .filter((t) => t !== "All Types")
              .map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </Field>
        <Field label="Date">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
          />
        </Field>
      </div>
      <Field label="Description / notes">
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder="Optional notes about this report"
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
        />
      </Field>
      <Field label="File">
        <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-cyan-600 hover:bg-cyan-50/40">
          <FileText size={22} className="text-slate-400" />
          <span className="text-sm font-medium text-slate-600">
            {fileName || "Click to upload a file"}
          </span>
          <span className="text-xs text-slate-400">
            PDF, JPG, JPEG or PNG
          </span>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
      </Field>
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onClose}
          className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="h-11 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Submit report
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
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
