import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  FileText,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

const records = [
  {
    id: "REC-001",
    title: "General Health Checkup",
    doctor: "Dr. Arjun Sharma",
    date: "12 Aug 2026",
    type: "Consultation",
    status: "Completed",
  },
  {
    id: "REC-002",
    title: "Complete Blood Count",
    doctor: "HealthO Diagnostics",
    date: "10 Aug 2026",
    type: "Lab Report",
    status: "Available",
  },
  {
    id: "REC-003",
    title: "Cardiology Consultation",
    doctor: "Dr. Arjun Sharma",
    date: "02 Aug 2026",
    type: "Consultation",
    status: "Completed",
  },
  {
    id: "REC-004",
    title: "Blood Sugar Test",
    doctor: "HealthO Diagnostics",
    date: "28 Jul 2026",
    type: "Lab Report",
    status: "Available",
  },
];

export default function MedicalRecordsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">

          {/* Header */}
          <div className="mb-8">
            <Link
              href="/user/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>

            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                Health information
              </p>

              <h1 className="font-display mt-2 text-4xl font-semibold text-slate-950">
                Medical Records
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                View your consultations, test reports and other healthcare
                records in one place.
              </p>
            </div>
          </div>

          {/* Summary */}
          <section className="grid gap-4 sm:grid-cols-3">
            <SummaryCard
              icon={FileText}
              label="Total records"
              value="08"
            />

            <SummaryCard
              icon={Stethoscope}
              label="Consultations"
              value="04"
            />

            <SummaryCard
              icon={Activity}
              label="Lab reports"
              value="04"
            />
          </section>

          {/* Health overview */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-cyan-50 p-2.5 text-cyan-700">
                <HeartPulse size={20} />
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  Health overview
                </h2>

                <p className="text-sm text-slate-500">
                  Latest available health information.
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <HealthMetric
                label="Blood pressure"
                value="120 / 80"
                unit="mmHg"
              />

              <HealthMetric
                label="Heart rate"
                value="72"
                unit="bpm"
              />

              <HealthMetric
                label="Blood sugar"
                value="96"
                unit="mg/dL"
              />

              <HealthMetric
                label="Blood group"
                value="O+"
                unit=""
              />
            </div>
          </section>

          {/* Records */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                  Records
                </p>

                <h2 className="font-display mt-2 text-2xl font-semibold text-slate-950">
                  Your healthcare history
                </h2>
              </div>

              <button
                type="button"
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Filter records
              </button>
            </div>

            <div className="mt-7 divide-y divide-slate-100">
              {records.map((record) => (
                <RecordRow
                  key={record.id}
                  title={record.title}
                  doctor={record.doctor}
                  date={record.date}
                  type={record.type}
                  status={record.status}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

type SummaryCardProps = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
};

function SummaryCard({
  icon: Icon,
  label,
  value,
}: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
          <Icon size={19} />
        </div>

        <span className="font-display text-3xl font-semibold text-slate-950">
          {value}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">{label}</p>
    </div>
  );
}

type HealthMetricProps = {
  label: string;
  value: string;
  unit: string;
};

function HealthMetric({
  label,
  value,
  unit,
}: HealthMetricProps) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <p className="text-xs font-medium text-slate-500">
        {label}
      </p>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-mono text-xl font-medium text-slate-950">
          {value}
        </span>

        {unit && (
          <span className="text-xs text-slate-400">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

type RecordRowProps = {
  title: string;
  doctor: string;
  date: string;
  type: string;
  status: string;
};

function RecordRow({
  title,
  doctor,
  date,
  type,
  status,
}: RecordRowProps) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-4">
        <div className="rounded-xl bg-cyan-50 p-3 text-cyan-700">
          <FileText size={19} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-slate-900">
            {title}
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {doctor}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <CalendarDays size={13} />
              {date}
            </span>

            <span>{type}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          {status}
        </span>

        <button
          type="button"
          className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-950"
          aria-label={`View ${title}`}
        >
          <ChevronRight size={17} />
        </button>
      </div>
    </div>
  );
}