"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getDoctors } from "@/services/data";

export default function PatientDoctorsPage() {
  const session = getSession();
  const [query, setQuery] = useState("");
  const [doctors] = useState(() => getDoctors());

  const filtered = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(query.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <RoleShell role="PATIENT">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Directory</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Find Doctors</h1>
        <p className="mt-2 text-sm text-slate-500">Search and connect with healthcare professionals.</p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search doctors or specializations..."
            aria-label="Search doctors"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => (
          <div key={doc.id} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-cyan-600 hover:bg-cyan-50/40">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-display text-lg font-semibold text-white">
                {doc.initials || doc.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-slate-950">{doc.name}</h3>
                <p className="text-sm text-cyan-700">{doc.specialization}</p>
              </div>
            </div>
            <div className="mt-4 space-y-2 text-xs text-slate-500">
              <p className="flex items-center gap-1.5"><MapPin size={13} />{doc.hospital}</p>
              <p>{doc.experience} experience · {doc.qualification}</p>
            </div>
            <Link href={`/patient/doctors/${doc.id}`} className="mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800">
              View Profile
            </Link>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <Search size={32} className="mx-auto text-slate-300" />
          <h2 className="font-display mt-4 text-xl font-semibold text-slate-950">No doctors found</h2>
          <p className="mt-2 text-sm text-slate-500">Try adjusting your search.</p>
        </div>
      )}
    </RoleShell>
  );
}
