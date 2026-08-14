import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/Logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center">
              <Image
                src={Logo}
                alt="HealthO Logo"
                className="h-14 w-auto object-contain"
                priority
              />

              <span className="ml-3 text-2xl font-bold text-white">
                HealthO
              </span>
            </div>

            <p className="max-w-sm text-sm leading-6 text-slate-400">
              Your trusted healthcare companion, connecting you with
              quality medical services and compassionate care.
            </p>

            <div className="mt-6 flex gap-3">

              <Link
                href="www.linkedin.com/in/luckynagarg"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900 transition hover:border-cyan-400 hover:text-cyan-400"
              >
                in
              </Link>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="transition hover:text-cyan-400">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/doctors" className="transition hover:text-cyan-400">
                  Find Doctors
                </Link>
              </li>

              <li>
                <Link
                  href="/appointments"
                  className="transition hover:text-cyan-400"
                >
                  Appointments
                </Link>
              </li>

              <li>
                <Link
                  href="/services"
                  className="transition hover:text-cyan-400"
                >
                  Our Services
                </Link>
              </li>

              <li>
                <Link href="/about" className="transition hover:text-cyan-400">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Healthcare
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/specialists"
                  className="transition hover:text-cyan-400"
                >
                  Medical Specialists
                </Link>
              </li>

              <li>
                <Link
                  href="/emergency"
                  className="transition hover:text-cyan-400"
                >
                  Emergency Care
                </Link>
              </li>

              <li>
                <Link
                  href="/pharmacy"
                  className="transition hover:text-cyan-400"
                >
                  Pharmacy
                </Link>
              </li>

              <li>
                <Link
                  href="/lab-tests"
                  className="transition hover:text-cyan-400"
                >
                  Lab Tests
                </Link>
              </li>

              <li>
                <Link
                  href="/health-checkup"
                  className="transition hover:text-cyan-400"
                >
                  Health Checkups
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <span className="text-cyan-400">📍</span>
                <p className="text-slate-400">
                  123 Healthcare Avenue,
                  <br />
                  New Delhi, India
                </p>
              </div>

              <div className="flex gap-3">
                <span className="text-cyan-400">☎</span>
                <Link
                  href="tel:+911234567890"
                  className="transition hover:text-cyan-400"
                >
                  +91 12345 67890
                </Link>
              </div>

              <div className="flex gap-3">
                <span className="text-cyan-400">✉</span>
                <Link
                  href="mailto:care@healtho.com"
                  className="transition hover:text-cyan-400"
                >
                  care@healtho.com
                </Link>
              </div>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Available 24/7
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-800" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-slate-500">
            © {new Date().getFullYear()} HealthO. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="text-slate-500 transition hover:text-cyan-400"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-slate-500 transition hover:text-cyan-400"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;