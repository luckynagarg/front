import Link from "next/link";
import { CalendarDays, FlaskConical } from "lucide-react";

export default function ActionPanel() {
  return (
    <aside className="space-y-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
          Take Action
        </p>
        <h2 className="font-display mt-2 text-2xl font-semibold text-slate-950">
          Manage your healthcare
        </h2>
      </div>

      {/* Book appointment */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
          <CalendarDays size={22} />
        </span>

        <h3 className="font-display mt-4 text-xl font-semibold text-slate-950">
          Book Appointment
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Consult your doctor and manage your next visit.
        </p>

        <Link
          href="/user/appointment/book"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Book Appointment
        </Link>
      </section>

      {/* Lab registration */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
          <FlaskConical size={22} />
        </span>

        <h3 className="font-display mt-4 text-xl font-semibold text-slate-950">
          Online Lab Registration
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Register for diagnostic tests and manage your lab bookings.
        </p>

        <Link
          href="/user/lab"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Register for Lab
        </Link>
      </section>
    </aside>
  );
}