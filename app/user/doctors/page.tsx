import Link from "next/link";
import { Clock3, MapPin, Star } from "lucide-react";
import { doctors } from "@/lib/mockData";

export default function DoctorsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
          <div className="mt-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
              Patient portal
            </p>

            <h1 className="font-display mt-2 text-4xl font-semibold text-slate-950">
              Find Doctors
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Browse verified healthcare professionals and book appointments.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {doctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/user/doctors/${doctor.id}`}
                className="group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-950 font-display text-xl font-semibold text-white">
                    {doctor.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="font-display text-xl font-semibold text-slate-950 group-hover:text-cyan-700">
                      {doctor.name}
                    </h2>

                    <p className="mt-1 text-sm text-cyan-700">
                      {doctor.specialization}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 size={13} />
                        {doctor.experience}
                      </span>

                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={13} />
                        {doctor.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                    <Star size={13} className="fill-current" />
                    {doctor.rating}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm text-slate-500">
                    Consultation fee
                  </span>

                  <span className="font-mono text-sm font-semibold text-slate-950">
                    ₹{doctor.consultationFee}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}