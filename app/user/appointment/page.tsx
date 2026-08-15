"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Video,
} from "lucide-react";
import { useState } from "react";
import { appointments } from "@/lib/mockData";

const filters = ["All", "Confirmed", "Pending", "Completed"];

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? appointments
      : appointments.filter(
          (appointment) => appointment.status === filter,
        );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">

          <Link
            href="/user/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                Patient portal
              </p>

              <h1 className="font-display mt-2 text-4xl font-semibold text-slate-950">
                Appointments
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your upcoming and previous appointments.
              </p>
            </div>

            <Link
              href="/user/doctors"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Book appointment
            </Link>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-1">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  filter === item
                    ? "bg-slate-950 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            {filtered.map((appointment) => (
              <AppointmentRow
                key={appointment.id}
                appointment={appointment}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-12 text-center">
              <CalendarDays
                size={32}
                className="mx-auto text-slate-300"
              />

              <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">
                No appointments
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                You don't have any appointments in this category.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function AppointmentRow({
  appointment,
}: {
  appointment: (typeof appointments)[number];
}) {
  const online = appointment.type === "Video consultation";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-display text-xl font-semibold text-white">
          {appointment.doctorName
            .split(" ")
            .filter((word) => word !== "Dr.")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display text-xl font-semibold text-slate-950">
              {appointment.doctorName}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                appointment.status === "Confirmed"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {appointment.status}
            </span>
          </div>

          <p className="mt-1 text-sm text-cyan-700">
            {appointment.specialization}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={14} />
              {appointment.date}
            </span>

            <span className="inline-flex items-center gap-1.5">
              <Clock3 size={14} />
              {appointment.time}
            </span>

            <span className="inline-flex items-center gap-1.5">
              {online ? (
                <Video size={14} />
              ) : (
                <MapPin size={14} />
              )}
              {appointment.location}
            </span>
          </div>
        </div>

        <div className="flex gap-2 sm:flex-col">
          <button
            type="button"
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            View details
          </button>

          {appointment.status === "Confirmed" && (
            <button
              type="button"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              Reschedule
            </button>
          )}
        </div>
      </div>
    </div>
  );
}