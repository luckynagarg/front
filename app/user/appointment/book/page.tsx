"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Video,
} from "lucide-react";
import { Suspense, useState } from "react";
import { appointmentSlots, doctors } from "@/lib/mockData";

const dates = [
  { day: "18", month: "Aug", weekday: "Tue" },
  { day: "19", month: "Aug", weekday: "Wed" },
  { day: "20", month: "Aug", weekday: "Thu" },
  { day: "21", month: "Aug", weekday: "Fri" },
  { day: "22", month: "Aug", weekday: "Sat" },
];

export default function BookAppointmentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <BookAppointmentContent />
    </Suspense>
  );
}

function BookAppointmentContent() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctor");

  const doctor =
    doctors.find((item) => item.id === doctorId) ?? doctors[0];

  const [selectedDate, setSelectedDate] = useState("18");
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [type, setType] = useState<"in-person" | "online">("in-person");
  const [booked, setBooked] = useState(false);

  if (booked) {
    return (
      <Confirmation
        doctor={doctor}
        date={selectedDate}
        time={selectedTime}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">

          <Link
            href={`/user/doctors/${doctor.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to doctor
          </Link>

          <div className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
              Appointment
            </p>

            <h1 className="font-display mt-2 text-4xl font-semibold text-slate-950">
              Book appointment
            </h1>
          </div>

          <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_340px]">

            {/* Booking form */}
            <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">

              <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 font-display font-semibold text-white">
                  {doctor.initials}
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold text-slate-950">
                    {doctor.name}
                  </h2>

                  <p className="mt-1 text-sm text-cyan-700">
                    {doctor.specialization}
                  </p>
                </div>
              </div>

              {/* Date */}
              <div className="mt-7">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} className="text-cyan-700" />

                  <h3 className="font-semibold text-slate-900">
                    Choose date
                  </h3>
                </div>

                <div className="mt-4 grid grid-cols-5 gap-2">
                  {dates.map((date) => {
                    const active = selectedDate === date.day;

                    return (
                      <button
                        key={date.day}
                        type="button"
                        onClick={() => setSelectedDate(date.day)}
                        className={`rounded-2xl border p-3 text-center transition ${
                          active
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="block text-[10px] uppercase">
                          {date.weekday}
                        </span>

                        <span className="mt-1 block font-display text-xl font-semibold">
                          {date.day}
                        </span>

                        <span className="block text-[10px]">
                          {date.month}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time */}
              <div className="mt-8">
                <div className="flex items-center gap-2">
                  <Clock3 size={18} className="text-cyan-700" />

                  <h3 className="font-semibold text-slate-900">
                    Choose time
                  </h3>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {appointmentSlots.map((slot) => {
                    const active = selectedTime === slot;

                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTime(slot)}
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

              {/* Type */}
              <div className="mt-8">
                <h3 className="font-semibold text-slate-900">
                  Consultation type
                </h3>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <ConsultationType
                    active={type === "in-person"}
                    icon={MapPin}
                    title="In-person"
                    description="Visit the clinic"
                    onClick={() => setType("in-person")}
                  />

                  <ConsultationType
                    active={type === "online"}
                    icon={Video}
                    title="Video consultation"
                    description="Meet online"
                    onClick={() => setType("online")}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBooked(true)}
                className="mt-8 h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Confirm appointment
              </button>
            </section>

            {/* Summary */}
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                Summary
              </p>

              <h2 className="font-display mt-2 text-2xl font-semibold text-slate-950">
                Appointment details
              </h2>

              <div className="mt-6 space-y-4">
                <SummaryRow
                  label="Doctor"
                  value={doctor.name}
                />

                <SummaryRow
                  label="Specialization"
                  value={doctor.specialization}
                />

                <SummaryRow
                  label="Date"
                  value={`${selectedDate} Aug 2026`}
                />

                <SummaryRow
                  label="Time"
                  value={selectedTime}
                />

                <SummaryRow
                  label="Type"
                  value={
                    type === "in-person"
                      ? "In-person"
                      : "Video consultation"
                  }
                />
              </div>

              <div className="mt-6 border-t border-slate-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Consultation fee
                  </span>

                  <span className="font-mono font-semibold text-slate-950">
                    ₹{doctor.consultationFee}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function ConsultationType({
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
        <p className="text-sm font-semibold text-slate-800">
          {title}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {description}
        </p>
      </div>
    </button>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-slate-400">{label}</p>

      <p className="mt-1 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}

function Confirmation({
  doctor,
  date,
  time,
}: {
  doctor: (typeof doctors)[number];
  date: string;
  time: string;
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-64">
        <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={34} />
            </div>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-600">
              Appointment confirmed
            </p>

            <h1 className="font-display mt-3 text-4xl font-semibold text-slate-950">
              You&apos;re all set.
            </h1>

            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500">
              Your appointment has been scheduled successfully.
            </p>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-left">
              <p className="font-semibold text-slate-900">
                {doctor.name}
              </p>

              <p className="mt-1 text-sm text-cyan-700">
                {doctor.specialization}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <SummaryRow
                  label="Date"
                  value={`${date} Aug 2026`}
                />

                <SummaryRow
                  label="Time"
                  value={time}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/user/appointment"
                className="flex h-12 flex-1 items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                View appointments
              </Link>

              <Link
                href="/user/doctors"
                className="flex h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Find another doctor
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}