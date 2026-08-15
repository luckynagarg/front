import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Star,
  Video,
} from "lucide-react";
import { notFound } from "next/navigation";
import { doctors } from "@/lib/mockData";

type DoctorProfilePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DoctorProfilePage({
  params,
}: DoctorProfilePageProps) {
  const { id } = await params;

  const doctor = doctors.find((item) => item.id === id);

  if (!doctor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl px-5 py-8 sm:px-8">

          <Link
            href="/user/doctors"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft size={16} />
            Back to doctors
          </Link>

          {/* Profile */}
          <section className="mt-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-slate-950 font-display text-3xl font-semibold text-white">
                {doctor.initials}
              </div>

              <div className="flex-1">
                <div className="flex flex-col justify-between gap-4 sm:flex-row">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                      Verified healthcare professional
                    </p>

                    <h1 className="font-display mt-2 text-3xl font-semibold text-slate-950">
                      {doctor.name}
                    </h1>

                    <p className="mt-1 text-base text-cyan-700">
                      {doctor.specialization}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                    <Star size={16} className="fill-current" />
                    {doctor.rating}
                    <span className="font-normal text-amber-600">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2">
                    <Clock3 size={16} />
                    {doctor.experience}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} />
                    {doctor.location}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_380px]">

            {/* About */}
            <div className="space-y-6">
              <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  About the doctor
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {doctor.about}
                </p>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  Services
                </h2>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Service
                    title="General consultation"
                  />

                  <Service
                    title="Follow-up consultation"
                  />

                  <Service
                    title="Preventive healthcare"
                  />

                  <Service
                    title="Health assessment"
                  />
                </div>
              </section>
            </div>

            {/* Booking */}
            <aside className="h-fit rounded-3xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                Appointment
              </p>

              <h2 className="font-display mt-2 text-2xl font-semibold text-slate-950">
                Book a consultation
              </h2>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Consultation fee
                  </span>

                  <span className="font-mono font-medium text-slate-950">
                    ₹{doctor.consultationFee}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Info
                  icon={CalendarDays}
                  text="Flexible appointment slots"
                />

                <Info
                  icon={Video}
                  text="In-person or online"
                />

                <Info
                  icon={CheckCircle2}
                  text="Verified doctor"
                />
              </div>

              <Link
                href={`/user/appointments/book?doctor=${doctor.id}`}
                className="mt-7 flex h-12 w-full items-center justify-center rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Choose date & time
              </Link>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function Service({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
      <CheckCircle2 size={17} className="text-cyan-700" />

      <span className="text-sm font-medium text-slate-700">
        {title}
      </span>
    </div>
  );
}

function Info({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ size?: number }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-600">
      <Icon size={17} />
      {text}
    </div>
  );
}