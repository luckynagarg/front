import Link from "next/link";
import type { ReactNode } from "react";

export default function SignupLayout({
  eyebrow,
  title,
  description,
  children,
  backHref,
  backLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left */}
        <section className="hidden flex-col justify-between p-10 lg:flex">
          <Link
            href="/"
            className="font-display text-2xl font-semibold text-white"
          >
            HealthO
          </Link>

          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Join HealthO
            </p>
            <h1 className="font-display mt-5 text-6xl font-semibold leading-tight text-white">
              Better care
              <br />
              starts here.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
              Create your HealthO account and join a connected healthcare
              ecosystem built around controlled, secure access.
            </p>
          </div>

          <p className="font-mono text-xs text-slate-600">HEALTHO / 2026</p>
        </section>

        {/* Right */}
        <section className="flex items-center justify-center bg-slate-50 px-6 py-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <Link
                href="/"
                className="font-display text-2xl font-semibold text-slate-950 lg:hidden"
              >
                HealthO
              </Link>

              <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-cyan-700">
                {eyebrow}
              </p>
              <h2 className="font-display mt-3 text-4xl font-semibold text-slate-950">
                {title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-500">
                {description}
              </p>
            </div>

            {children}

            {backHref && backLabel && (
              <p className="mt-8 text-center text-sm text-slate-500">
                <Link href={backHref} className="font-semibold text-cyan-700 hover:text-cyan-800">
                  {backLabel}
                </Link>
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}