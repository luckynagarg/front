import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left side */}
        <section className="hidden flex-col justify-between p-10 lg:flex">
          <Link
            href="/"
            className="font-display text-2xl font-semibold text-white"
          >
            HealthO
          </Link>

          <div className="max-w-xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              Healthcare / Connected
            </p>

            <h1 className="font-display mt-5 text-6xl font-semibold leading-tight text-white">
              Your health,
              <br />
              in one place.
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
              Access appointments, medical records, prescriptions and
              healthcare services through one simple platform.
            </p>
          </div>

          <p className="font-mono text-xs text-slate-600">
            HEALTHO / 2026
          </p>
        </section>

        {/* Right side */}
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
                Welcome back
              </p>

              <h2 className="font-display mt-3 text-4xl font-semibold text-slate-950">
                Sign in to HealthO
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Continue your healthcare journey.
              </p>
            </div>

            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs font-semibold text-cyan-700 hover:text-cyan-800"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10"
                />
              </div>

              <button
                type="submit"
                className="h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Sign in
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <button
              type="button"
              className="flex h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Continue with Google
            </button>

            <p className="mt-8 text-center text-sm text-slate-500">
              {"Don't have an account? "}
              <Link
                href="/pages/signup"
                className="font-semibold text-cyan-700 hover:text-cyan-800"
              >
                Create one
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}