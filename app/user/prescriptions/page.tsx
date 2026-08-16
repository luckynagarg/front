"use client";

import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  FileText,
  Pill,
  Stethoscope,
} from "lucide-react";
import { useState } from "react";
import { prescriptions } from "@/lib/mockData";

export default function PrescriptionsPage() {
  const [openId, setOpenId] = useState<string | null>(
    prescriptions[0]?.id ?? null,
  );

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
              Medical records
            </p>

            <h1 className="font-display mt-2 text-4xl font-semibold text-slate-950">
              Prescriptions
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View prescriptions issued by your healthcare providers.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {prescriptions.map((prescription) => {
              const isOpen = openId === prescription.id;

              return (
                <section
                  key={prescription.id}
                  className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenId(isOpen ? null : prescription.id)
                    }
                    className="flex w-full items-center gap-4 p-6 text-left sm:p-7"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                      <FileText size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="font-display text-xl font-semibold text-slate-950">
                        {prescription.diagnosis}
                      </h2>

                      <p className="mt-1 text-sm text-cyan-700">
                        {prescription.doctor}
                      </p>

                      <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <CalendarDays size={13} />
                        {prescription.date}
                      </div>
                    </div>

                    {isOpen ? (
                      <ChevronUp className="text-slate-400" />
                    ) : (
                      <ChevronDown className="text-slate-400" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 p-6 sm:p-7">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-slate-100 p-2.5">
                          <Pill size={18} />
                        </div>

                        <div>
                          <h3 className="font-display text-xl font-semibold text-slate-950">
                            Medicines
                          </h3>

                          <p className="text-xs text-slate-500">
                            {"Follow your doctor's instructions."}
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                        <div className="hidden grid-cols-4 bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-500 sm:grid">
                          <span>Medicine</span>
                          <span>Dosage</span>
                          <span>Frequency</span>
                          <span>Duration</span>
                        </div>

                        {prescription.medicines.map((medicine) => (
                          <div
                            key={medicine.name}
                            className="grid gap-3 border-t border-slate-100 px-5 py-5 sm:grid-cols-4"
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {medicine.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {medicine.instruction}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400 sm:hidden">
                                Dosage
                              </p>

                              <p className="text-sm text-slate-700">
                                {medicine.dosage}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400 sm:hidden">
                                Frequency
                              </p>

                              <p className="text-sm text-slate-700">
                                {medicine.frequency}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-slate-400 sm:hidden">
                                Duration
                              </p>

                              <p className="text-sm text-slate-700">
                                {medicine.duration}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                        <div className="flex gap-3">
                          <Stethoscope
                            size={18}
                            className="mt-0.5 shrink-0 text-cyan-700"
                          />

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              {"Doctor's notes"}
                            </p>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {prescription.notes}
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <FileText size={15} />
                        View prescription
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