import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
};

export default function StatCard({
  label,
  value,
  description,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <p className="font-display mt-2 text-3xl font-semibold text-slate-950">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-cyan-50 p-2.5 text-cyan-700">
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">{description}</p>
    </div>
  );
}