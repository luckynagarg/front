import { Bell, Menu } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
          Patient portal
        </p>

        <h1 className="font-display mt-1 text-xl font-semibold text-slate-950 sm:text-2xl">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          className="relative rounded-full border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-50"
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-cyan-600" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-full bg-slate-100 p-1.5 pr-3"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
            LN
          </span>

          <span className="hidden text-sm font-medium text-slate-700 sm:block">
            Lucky
          </span>
        </button>
      </div>
    </header>
  );
}