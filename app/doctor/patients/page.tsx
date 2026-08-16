"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, UserPlus } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getPatients } from "@/services/data";

export default function DoctorPatientsPage() {
  const router = useRouter();
  const session = getSession();
  const [query, setQuery] = useState("");
  const [patients] = useState(() => getPatients());

  const filtered = patients.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <RoleShell role="DOCTOR">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Directory</p>
          <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Patients</h1>
          <p className="mt-2 text-sm text-slate-500">Search and view patient profiles.</p>
        </div>
        <button type="button" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
          <UserPlus size={16} />
          Add Patient
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients..."
            aria-label="Search patients"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <Search size={32} className="mx-auto text-slate-300" />
            <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">No patients found</h2>
            <p className="mt-2 text-sm text-slate-500">Try adjusting your search.</p>
          </div>
        ) : (
          filtered.map((patient) => (
            <div key={patient.id} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-cyan-600 hover:bg-cyan-50/40">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-display text-lg font-semibold text-white">
                    {patient.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-slate-950">{patient.name}</h3>
                    <p className="text-sm text-slate-500">{patient.gender} · {patient.bloodGroup} · {patient.dateOfBirth}</p>
                  </div>
                </div>
                <Link href={`/doctor/patients/${patient.id}`} className="inline-flex h-10 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800">
                  View Profile
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </RoleShell>
  );
}
