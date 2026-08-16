"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FlaskConical, Plus } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";

const labTests = [
  "CBC",
  "Lipid Profile",
  "Blood Sugar",
  "Thyroid Profile",
  "Liver Function Test",
  "Kidney Function Test",
];

export default function LabTestsPage() {
  const router = useRouter();
  const session = getSession();
  const [selected, setSelected] = useState(labTests[0]);

  useEffect(() => {
    if (!session) { router.push("/login"); }
  }, [session, router]);

  return (
    <RoleShell role="LAB">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Diagnostics</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Available Tests</h1>
        <p className="mt-2 text-sm text-slate-500">Browse and manage diagnostic tests.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {labTests.map((test) => {
          const active = selected === test;
          return (
            <div
              key={test}
              className={`rounded-2xl border p-6 transition ${
                active
                  ? "border-cyan-600 bg-cyan-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
            >
              <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${active ? "bg-cyan-100 text-cyan-700" : "bg-slate-100 text-slate-600"}`}>
                <FlaskConical size={22} />
              </span>
              <h3 className="font-display mt-4 text-xl font-semibold text-slate-950">{test}</h3>
              <p className="mt-2 text-sm text-slate-500">Diagnostic test</p>
              <button type="button" className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800">
                Manage
              </button>
            </div>
          );
        })}
      </div>
    </RoleShell>
  );
}
