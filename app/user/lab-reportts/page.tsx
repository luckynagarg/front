"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Download,
  FlaskConical,
  FileText,
} from "lucide-react";
import { useState } from "react";
import { labReports } from "@/lib/mockData";

export default function LabReportsPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">

          <Link
            href="/user/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <div className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
              Diagnostics
            </p>

            <h1 className="font-display mt-2 text-4xl font-semibold text-slate-950">
              Lab Reports
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Access your diagnostic reports and test results.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat
              label="Total reports"
              value="04"
            />

            <Stat
              label="Normal results"
              value="03"
            />

            <Stat
              label="Needs review"
              value="01"
            />
          </div>

          {/* Reports */}
          <div className="mt-6 space-y-4">
            {labReports.map((report) => {
              const isOpen = openId === report.id;

              return (
                <section
                  key={report.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                >
                  <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                      <FlaskConical size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-xl font-semibold text-slate-950">
                        {report.testName}
                      </h2>

                      <p className="mt-1 text-sm text-slate-500">
                        {report.laboratory}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-400">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays size={13} />
                          {report.date}
                        </span>

                        <span>
                          Requested by {report.doctor}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                          report.status === "Normal"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {report.status}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenId(isOpen ? null : report.id)
                        }
                        className="rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:bg-slate-50"
                        aria-label="Toggle report"
                      >
                        {isOpen ? (
                          <ChevronUp size={17} />
                        ) : (
                          <ChevronDown size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-slate-100 p-6 sm:p-7">
                      <h3 className="font-display text-xl font-semibold text-slate-950">
                        Test results
                      </h3>

                      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                        <div className="grid grid-cols-3 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-500">
                          <span>Parameter</span>
                          <span>Result</span>
                          <span>Reference</span>
                        </div>

                        {report.results.map((result) => (
                          <div
                            key={result.parameter}
                            className="grid grid-cols-3 border-t border-slate-100 px-5 py-4"
                          >
                            <span className="text-sm text-slate-700">
                              {result.parameter}
                            </span>

                            <span className="font-mono text-sm font-medium text-slate-950">
                              {result.value} {result.unit}
                            </span>

                            <span className="text-sm text-slate-500">
                              {result.range}
                            </span>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800"
                      >
                        <Download size={15} />
                        Download report
                      </button>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-xs text-slate-400">{label}</p>

      <p className="font-display mt-2 text-3xl font-semibold text-slate-950">
        {value}
      </p>
    </div>
  );
}