import DashboardShell from "@/components/dashboard/DashboardShell";
import HealthCard from "@/components/dashboard/HealthCard";
import HealthSummary from "@/components/dashboard/HealthSummary";
import ActionPanel from "@/components/dashboard/ActionPanel";
import { getUser } from "@/lib/dashboardStorage";

export default function UserDashboardPage() {
  const user = getUser();

  return (
    <DashboardShell>
      <div className="mb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
          Welcome back
        </p>
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
          My Health Card
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
          Your verified medical identity and healthcare overview, {user.name}.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(280px,3fr)]">
        {/* Main content */}
        <div className="min-w-0 space-y-6">
          <HealthCard />
          <HealthSummary />
        </div>

        {/* Right action panel */}
        <div className="min-w-0">
          <ActionPanel />
        </div>
      </div>
    </DashboardShell>
  );
}