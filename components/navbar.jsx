import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/Logo.png"
            alt="HealthO"
            width={48}
            height={48}
            className="h-11 w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#services"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            Services
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            How it works
          </Link>

          <Link
            href="#about"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-950"
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/pages/login"
            className="hidden text-sm font-semibold text-slate-700 transition hover:text-slate-950 sm:block"
          >
            Login
          </Link>

          <Link
            href="/pages/signup"
            className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}