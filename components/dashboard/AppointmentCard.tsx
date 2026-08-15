import { CalendarDays, Clock3, MapPin } from "lucide-react";

export default function AppointmentCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
            Upcoming appointment
          </p>

          <h3 className="font-display mt-3 text-2xl font-semibold text-slate-950">
            Dr. Arjun Sharma
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Cardiologist
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          Confirmed
        </span>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <Info
          icon={CalendarDays}
          label="Date"
          value="18 Aug 2026"
        />

        <Info
          icon={Clock3}
          label="Time"
          value="10:30 AM"
        />

        <Info
          icon={MapPin}
          label="Location"
          value="HealthO Clinic"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          View appointment
        </button>

        <button
          type="button"
          className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Reschedule
        </button>
      </div>
    </div>
  );
}

type InfoProps = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  value: string;
};

function Info({ icon: Icon, label, value }: InfoProps) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <div className="flex items-center gap-2 text-slate-400">
        <Icon size={15} />

        <span className="text-xs">{label}</span>
      </div>

      <p className="mt-2 text-sm font-semibold text-slate-800">
        {value}
      </p>
    </div>
  );
}