import type { ReactNode } from "react";

export default function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950 sm:text-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}