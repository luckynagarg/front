import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        {icon ?? <Inbox size={24} />}
      </div>
      <h3 className="font-display mt-4 text-lg font-semibold text-slate-950">
        {title}
      </h3>
      {description && (
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
          {description}
        </p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-12 text-center">
      <Loader2 size={24} className="animate-spin text-cyan-700" />
      <p className="mt-3 text-sm text-slate-500">{label}</p>
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again.",
  action,
}: {
  title?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
        <AlertTriangle size={24} />
      </div>
      <h3 className="font-display mt-4 text-lg font-semibold text-red-900">
        {title}
      </h3>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-red-700">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}