import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-semibold text-white">
              HealthO
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              One connected healthcare experience for patients, doctors,
              laboratories and pharmacies.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Platform</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link href="#services" className="hover:text-white">
                Services
              </Link>

              <Link href="#how-it-works" className="hover:text-white">
                How it works
              </Link>

              <Link href="/pages/login" className="hover:text-white">
                Login
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Healthcare</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <span>Doctors</span>
              <span>Laboratories</span>
              <span>Pharmacy</span>
              <span>Appointments</span>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-6">
          <p className="font-mono text-xs text-slate-500">
            © 2026 HealthO. Healthcare, simplified.
          </p>
        </div>
      </div>
    </footer>
  );
}