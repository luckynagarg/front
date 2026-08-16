"use client";

import { useState } from "react";
import {
  CheckCircle2,
  FlaskConical,
  Home,
  MapPin,
} from "lucide-react";
import DashboardShell from "@/components/dashboard/DashboardShell";
import {
  addLabRegistration,
  getLabRegistrations,
  nextLabId,
} from "@/lib/dashboardStorage";
import { labTests, labTimeSlots } from "@/lib/dashboardData";

const dates = [
  { day: "17", month: "Aug", weekday: "Mon" },
  { day: "18", month: "Aug", weekday: "Tue" },
  { day: "19", month: "Aug", weekday: "Wed" },
  { day: "20", month: "Aug", weekday: "Thu" },
  { day: "21", month: "Aug", weekday: "Fri" },
];

export default function LabPage() {
  const [test, setTest] = useState(labTests[0]);
  const [method, setMethod] = useState<"Home Sample Collection" | "Visit Lab">(
    "Home Sample Collection",
  );
  const [date, setDate] = useState("17");
  const [time, setTime] = useState(labTimeSlots[0]);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<{
    id: string;
    testName: string;
    collectionMethod: string;
    date: string;
    time: string;
  } | null>(null);
  const [registrations, setRegistrations] = useState(getLabRegistrations());

  const handleRegister = () => {
    if (method === "Home Sample Collection" && !address.trim()) {
      setError("Please enter your collection address.");
      return;
    }

    const registration = {
      id: nextLabId(),
      testName: test,
      collectionMethod: method,
      date: `${date} Aug 2026`,
      time,
      address: method === "Home Sample Collection" ? address.trim() : undefined,
      status: "Confirmed" as const,
    };

    setRegistrations(addLabRegistration(registration));
    setConfirmed(registration);
    setError("");
  };

  return (
    <DashboardShell>
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
          Diagnostics
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
          Online Lab Registration
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Register for diagnostic tests and manage your lab bookings.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Form */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          {/* Test */}
          <div>
            <h3 className="font-semibold text-slate-900">Select test</h3>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {labTests.map((item) => {
                const active = test === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setTest(item)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                      active
                        ? "border-cyan-600 bg-cyan-50 text-cyan-800"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <FlaskConical
                      size={16}
                      className={active ? "text-cyan-700" : "text-slate-400"}
                    />
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collection method */}
          <div className="mt-8">
            <h3 className="font-semibold text-slate-900">
              Collection method
            </h3>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <MethodOption
                active={method === "Home Sample Collection"}
                icon={Home}
                title="Home Sample Collection"
                description="We visit your address"
                onClick={() => setMethod("Home Sample Collection")}
              />

              <MethodOption
                active={method === "Visit Lab"}
                icon={MapPin}
                title="Visit Lab"
                description="Visit a HealthO lab"
                onClick={() => setMethod("Visit Lab")}
              />
            </div>
          </div>

          {/* Date */}
          <div className="mt-8">
            <h3 className="font-semibold text-slate-900">Preferred date</h3>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {dates.map((item) => {
                const active = date === item.day;

                return (
                  <button
                    key={item.day}
                    type="button"
                    onClick={() => setDate(item.day)}
                    className={`rounded-2xl border p-3 text-center transition ${
                      active
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="block text-[10px] uppercase">
                      {item.weekday}
                    </span>
                    <span className="mt-1 block font-display text-xl font-semibold">
                      {item.day}
                    </span>
                    <span className="block text-[10px]">{item.month}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time */}
          <div className="mt-8">
            <h3 className="font-semibold text-slate-900">Preferred time</h3>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {labTimeSlots.map((slot) => {
                const active = time === slot;

                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTime(slot)}
                    className={`rounded-xl border px-3 py-3 text-sm font-medium transition ${
                      active
                        ? "border-slate-950 bg-slate-950 text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Address */}
          {method === "Home Sample Collection" && (
            <div className="mt-8">
              <label
                htmlFor="lab-address"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Collection address
              </label>
              <textarea
                id="lab-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                rows={3}
                placeholder="Enter your full address for sample collection"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
              />
            </div>
          )}

          {error && (
            <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleRegister}
            className="mt-8 h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Register
          </button>
        </section>

        {/* Existing registrations */}
        <aside className="h-fit space-y-4 lg:sticky lg:top-24">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
              Bookings
            </p>
            <h2 className="font-display mt-2 text-2xl font-semibold text-slate-950">
              Lab registrations
            </h2>
          </div>

          {registrations.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center">
              <FlaskConical size={28} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm text-slate-500">
                No active lab registrations.
              </p>
            </div>
          )}

          {registrations.map((registration) => (
            <div
              key={registration.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-slate-900">
                  {registration.testName}
                </p>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  {registration.status}
                </span>
              </div>

              <p className="mt-1 font-mono text-[10px] text-slate-400">
                {registration.id}
              </p>

              <div className="mt-4 space-y-2 text-sm text-slate-500">
                <p>{registration.collectionMethod}</p>
                <p>
                  {registration.date} · {registration.time}
                </p>
                {registration.address && (
                  <p className="text-xs text-slate-400">
                    {registration.address}
                  </p>
                )}
              </div>
            </div>
          ))}
        </aside>
      </div>

      {/* Confirmation */}
      {confirmed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lab-confirm-title"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setConfirmed(null)}
            className="absolute inset-0 bg-slate-950/50"
          />

          <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={34} />
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-600">
              Lab registration confirmed
            </p>

            <h2
              id="lab-confirm-title"
              className="font-display mt-3 text-2xl font-semibold text-slate-950"
            >
              Registration ID
            </h2>
            <p className="mt-1 font-mono text-sm text-slate-500">
              {confirmed.id}
            </p>

            <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left">
              <p className="font-semibold text-slate-900">
                {confirmed.testName}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {confirmed.collectionMethod}
              </p>
              <p className="mt-3 text-sm text-slate-500">
                {confirmed.date} · {confirmed.time}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setConfirmed(null)}
              className="mt-6 h-11 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}

function MethodOption({
  active,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: React.ComponentType<{
    size?: number;
    className?: string;
    strokeWidth?: number;
  }>;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-cyan-600 bg-cyan-50"
          : "border-slate-200 bg-white hover:bg-slate-50"
      }`}
    >
      <Icon
        size={20}
        className={active ? "text-cyan-700" : "text-slate-400"}
      />
      <div>
        <p className="text-sm font-semibold text-slate-800">{title}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
    </button>
  );
}