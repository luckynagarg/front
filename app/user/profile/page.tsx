import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function UserProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="lg:pl-64">
        <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8">

          {/* Header */}
          <div className="mb-8">
            <Link
              href="/user/dashboard"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-950"
            >
              <ArrowLeft size={16} />
              Back to dashboard
            </Link>

            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-700">
                Account
              </p>

              <h1 className="font-display mt-2 text-4xl font-semibold text-slate-950">
                My Profile
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage your personal and healthcare information.
              </p>
            </div>
          </div>

          {/* Profile header */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 text-2xl font-semibold text-white">
                  LN
                </div>

                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-cyan-700 text-white transition hover:bg-cyan-800"
                  aria-label="Change profile photo"
                >
                  <Camera size={15} />
                </button>
              </div>

              <div>
                <h2 className="font-display text-2xl font-semibold text-slate-950">
                  Lucky Nagar
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Patient · HealthO member
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <ShieldCheck size={13} />
                    Profile verified
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 font-mono text-[10px] text-slate-500">
                    ID: HLO-00124
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Personal information */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <SectionHeading
              icon={UserRound}
              title="Personal information"
              description="Your basic personal details."
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <InputField
                label="Full name"
                value="Lucky Nagar"
              />

              <InputField
                label="Date of birth"
                value="15 May 2008"
                type="text"
              />

              <InputField
                label="Gender"
                value="Male"
              />

              <InputField
                label="Blood group"
                value="O+"
              />
            </div>
          </section>

          {/* Contact */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <SectionHeading
              icon={Phone}
              title="Contact information"
              description="How HealthO can reach you."
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <InputField
                label="Email"
                value="lucky@example.com"
                icon={Mail}
                type="email"
              />

              <InputField
                label="Phone number"
                value="+91 98765 43210"
                icon={Phone}
              />
            </div>
          </section>

          {/* Address */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <SectionHeading
              icon={MapPin}
              title="Address"
              description="Your current residential address."
            />

            <div className="mt-7 grid gap-5">
              <InputField
                label="Address"
                value="123 Healthcare Street"
              />

              <div className="grid gap-5 sm:grid-cols-3">
                <InputField
                  label="City"
                  value="Delhi"
                />

                <InputField
                  label="State"
                  value="Delhi"
                />

                <InputField
                  label="Pincode"
                  value="110001"
                />
              </div>
            </div>
          </section>

          {/* Emergency contact */}
          <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <SectionHeading
              icon={ShieldCheck}
              title="Emergency contact"
              description="Someone we can contact in an emergency."
            />

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <InputField
                label="Contact name"
                value="Emergency Contact"
              />

              <InputField
                label="Relationship"
                value="Parent"
              />

              <InputField
                label="Phone number"
                value="+91 98765 12345"
              />
            </div>
          </section>

          {/* Save */}
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              className="rounded-xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Save changes
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

type SectionHeadingProps = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
};

function SectionHeading({
  icon: Icon,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="rounded-xl bg-cyan-50 p-2.5 text-cyan-700">
        <Icon size={20} strokeWidth={1.8} />
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-950">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

type InputFieldProps = {
  label: string;
  value: string;
  icon?: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  type?: string;
};

function InputField({
  label,
  value,
  icon: Icon,
  type = "text",
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">
        {Icon ? (
          <Icon
            size={17}
            strokeWidth={1.8}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
        ) : null}

        <input
          type={type}
          defaultValue={value}
          className={`h-12 w-full rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none transition focus:border-cyan-600 focus:bg-white focus:ring-4 focus:ring-cyan-600/10 ${
            Icon ? "pl-11 pr-4" : "px-4"
          }`}
        />
      </div>
    </div>
  );
}