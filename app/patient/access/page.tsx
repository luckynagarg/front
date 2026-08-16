"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, ShieldOff, UserCheck, UserX } from "lucide-react";
import RoleShell from "@/components/dashboard/RoleShell";
import { getSession } from "@/lib/auth";
import { getAccessGrants, revokeAccessGrant, type AccessGrant } from "@/services/data";

export default function PatientAccessPage() {
  const session = getSession();
  const [grants, setGrants] = useState<AccessGrant[]>([]);
  const [revoking, setRevoking] = useState<string | null>(null);

  useEffect(() => {
    if (!session) { window.location.href = "/login"; return; }
    setGrants(getAccessGrants("PAT-001"));
  }, [session]);

  const handleRevoke = (id: string) => {
    setGrants(revokeAccessGrant(id));
    setRevoking(null);
  };

  return (
    <RoleShell role="PATIENT">
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Privacy</p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">Access & Privacy</h1>
        <p className="mt-2 text-sm text-slate-500">Manage which healthcare professionals can access your information.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
            <ShieldCheck size={20} />
          </span>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">Permissions</p>
            <h2 className="font-display mt-1 text-2xl font-semibold text-slate-950">Healthcare professionals with access</h2>
          </div>
        </div>

        <div className="space-y-4">
          {grants.length === 0 ? (
            <div className="py-8 text-center">
              <ShieldOff size={32} className="mx-auto text-slate-300" />
              <p className="mt-3 text-sm text-slate-500">No healthcare professionals have access to your records yet.</p>
            </div>
          ) : (
            grants.map((grant) => (
              <div key={grant.id} className="flex flex-col gap-4 rounded-xl border border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 font-display text-sm font-semibold text-white">
                    {grant.providerName.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{grant.providerName}</p>
                    <p className="mt-1 text-xs text-slate-500">{grant.providerRole}</p>
                    <p className="mt-1 text-xs text-slate-400">Access granted: {grant.grantedAt ? new Date(grant.grantedAt).toLocaleDateString() : ""}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${grant.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>
                    {grant.status}
                  </span>
                  {grant.status === "Active" && (
                    <button
                      type="button"
                      onClick={() => setRevoking(grant.id)}
                      className="inline-flex h-9 items-center gap-2 rounded-xl border border-red-200 px-3 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <UserX size={14} />
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Revoke confirmation */}
      {revoking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="revoke-title">
          <button type="button" aria-label="Close" onClick={() => setRevoking(null)} className="absolute inset-0 bg-slate-950/50" />
          <div className="relative w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
            <h2 id="revoke-title" className="font-display text-xl font-semibold text-slate-950">Revoke access?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              This healthcare professional will no longer be able to access your medical information. Are you sure?
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setRevoking(null)} className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                Cancel
              </button>
              <button type="button" onClick={() => handleRevoke(revoking)} className="h-11 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white transition hover:bg-red-700">
                Revoke access
              </button>
            </div>
          </div>
        </div>
      )}
    </RoleShell>
  );
}
