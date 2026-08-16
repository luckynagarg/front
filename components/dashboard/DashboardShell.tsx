"use client";

import { useState, type ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

export default function DashboardShell({
  children,
}: {
  children: ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="lg:pl-64">
        <DashboardHeader onMenuClick={() => setMobileOpen(true)} />

        <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}