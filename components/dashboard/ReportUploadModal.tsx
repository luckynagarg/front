"use client";

import { useEffect, useRef, useState } from "react";
import { FileUp, X } from "lucide-react";
import { reportTypes } from "@/lib/dashboardData";
import { addReport, nextReportId } from "@/lib/dashboardStorage";

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const ALLOWED_EXTENSIONS = ["pdf", "jpg", "jpeg", "png"];

export default function ReportUploadModal({
  open,
  onClose,
  onAdded,
}: {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState(reportTypes[0]);
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  // Focus the dialog when opened.
  useEffect(() => {
    if (open) {
      dialogRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const handleFile = (file: File | undefined) => {
    setError("");
    if (!file) {
      setFileName("");
      return;
    }

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    const validType = ALLOWED_TYPES.includes(file.type);
    const validExtension = ALLOWED_EXTENSIONS.includes(extension);

    if (!validType && !validExtension) {
      setError("Only PDF, JPG, JPEG or PNG files are allowed.");
      setFileName("");
      return;
    }

    setFileName(file.name);
  };

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

    addReport({
      id: nextReportId(),
      title: title.trim(),
      type,
      date,
      fileName,
      notes: notes.trim() || undefined,
      verification: { status: "pending" },
    });

    setTitle("");
    setType(reportTypes[0]);
    setDate("");
    setNotes("");
    setFileName("");
    setError("");
    onAdded();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl outline-none"
      >
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
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-6">
          <Field label="Report title">
            <input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Blood Test Report"
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Report type">
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
              >
                {reportTypes.map((item) => (
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
                onChange={(event) => setDate(event.target.value)}
                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
              />
            </Field>
          </div>

          <Field label="Description / notes">
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={3}
              placeholder="Optional notes about this report"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
            />
          </Field>

          <Field label="File">
            <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-cyan-600 hover:bg-cyan-50/40">
              <FileUp size={22} className="text-slate-400" />
              <span className="text-sm font-medium text-slate-600">
                {fileName || "Click to upload a file"}
              </span>
              <span className="text-xs text-slate-400">
                PDF, JPG, JPEG or PNG
              </span>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                className="sr-only"
                onChange={(event) => handleFile(event.target.files?.[0])}
              />
            </label>
          </Field>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              {error}
            </p>
          )}
        </div>

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
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}