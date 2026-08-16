import type { ReactNode } from "react";

type Tone = "green" | "amber" | "red" | "slate" | "cyan";

const tones: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-red-700",
  slate: "bg-slate-100 text-slate-600",
  cyan: "bg-cyan-50 text-cyan-700",
};

export default function StatusBadge({
  tone = "slate",
  children,
}: {
  tone?: Tone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
}