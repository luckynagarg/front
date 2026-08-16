import Link from "next/link";
import { ChevronRight, FileText, ShieldCheck } from "lucide-react";
import { getReports, getUser } from "@/lib/dashboardStorage";
import VerificationBadge from "./VerificationBadge";

export default function HealthSummary() {
  const reports = getReports();
  const user = getUser();
  const recent = reports.slice(0, 3);

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {/* Recent reports */}
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
            href="/user/reports"
            className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-700 transition hover:text-cyan-800"
          >
            View all
            <ChevronRight size={15} />
          </Link>
        </div>

        <div className="mt-5 divide-y divide-slate-100">
          {recent.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <FileText size={16} />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-800">
                    {report.title}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {report.date}
                  </p>
                </div>
              </div>

              <VerificationBadge status={report.verification.status} />
            </div>
          ))}
        </div>
      </section>

      {/* Verification info */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <ShieldCheck size={20} />
          </span>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
              Verification
            </p>
            <h3 className="font-display mt-1 text-xl font-semibold text-slate-950">
              Doctor verified
            </h3>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-sm text-slate-500">Verified by</span>
            <span className="text-sm font-semibold text-slate-800">
              {user.verifiedBy}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-sm text-slate-500">Last verified</span>
            <span className="text-sm font-semibold text-slate-800">
              {user.verifiedAt}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Status</span>
            <VerificationBadge status="verified" />
          </div>
        </div>

        <p className="mt-5 rounded-xl bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-500">
          Verified information can only be updated by an authorized
          healthcare professional.
        </p>
      </section>
    </div>
  );
}