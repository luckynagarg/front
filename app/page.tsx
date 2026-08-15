import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
            <div className="max-w-4xl">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-cyan-700">
                Healthcare / Reimagined
              </p>

              <h1 className="font-display mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-8xl">
                Healthcare that
                <span className="block text-cyan-700">works together.</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-600">
                HealthO brings patients, doctors, laboratories and pharmacies
                together in one connected healthcare experience.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/signup">Get Started</Button>

                <Button href="#services" variant="secondary">
                  Explore HealthO
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          className="border-y border-slate-200 bg-white py-20"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-700">
                One platform
              </p>

              <h2 className="font-display mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl">
                Everything connected.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                Every healthcare role gets its own focused experience while
                staying connected to the wider HealthO ecosystem.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <ServiceCard
                number="01"
                title="Patients"
                description="Manage your health profile, appointments, prescriptions and medical records."
              />

              <ServiceCard
                number="02"
                title="Doctors"
                description="Manage appointments, access authorized patient information and create prescriptions."
              />

              <ServiceCard
                number="03"
                title="Laboratories"
                description="Manage test appointments, patient requests and upload diagnostic reports."
              />

              <ServiceCard
                number="04"
                title="Pharmacy"
                description="Manage prescriptions, medicine orders and pharmacy operations."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-700">
                  Simple workflow
                </p>

                <h2 className="font-display mt-4 text-4xl font-semibold text-slate-950 sm:text-5xl">
                  From appointment to care.
                </h2>

                <p className="mt-6 max-w-xl leading-7 text-slate-600">
                  Book an appointment, connect with the right healthcare
                  professional, receive reports and keep your health
                  information organized.
                </p>
              </div>

              <div className="grid gap-4">
                <WorkflowStep
                  number="01"
                  title="Find"
                  description="Find a doctor, laboratory or healthcare service."
                />

                <WorkflowStep
                  number="02"
                  title="Book"
                  description="Choose an available slot and book your appointment."
                />

                <WorkflowStep
                  number="03"
                  title="Connect"
                  description="Healthcare professionals access only the information they are authorized to see."
                />

                <WorkflowStep
                  number="04"
                  title="Manage"
                  description="Keep prescriptions, reports and appointments organized."
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="about" className="bg-slate-950 py-20 text-white">
          <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
            <h2 className="font-display text-4xl font-semibold sm:text-5xl">
              Your healthcare.
              <br />
              One connected place.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-400">
              HealthO is designed to make healthcare simpler for everyone
              involved.
            </p>

            <div className="mt-8">
              <Button href="/signup">Create your account</Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

type ServiceCardProps = {
  number: string;
  title: string;
  description: string;
};

function ServiceCard({
  number,
  title,
  description,
}: ServiceCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <span className="font-mono text-xs text-cyan-700">{number}</span>

      <h3 className="font-display mt-8 text-2xl font-semibold text-slate-950">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}

type WorkflowStepProps = {
  number: string;
  title: string;
  description: string;
};

function WorkflowStep({
  number,
  title,
  description,
}: WorkflowStepProps) {
  return (
    <div className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5">
      <span className="font-mono text-xs text-cyan-700">{number}</span>

      <div>
        <h3 className="font-display text-xl font-semibold text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}