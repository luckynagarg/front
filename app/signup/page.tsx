import Link from "next/link";
import {
  Building2,
  FlaskConical,
  Pill,
  Stethoscope,
  UserRound,
} from "lucide-react";
import SignupLayout from "@/components/auth/SignupLayout";
import { ROLES, getRoleConfig, type Role } from "@/lib/roles";

const ICONS: Record<Role, typeof UserRound> = {
  PATIENT: UserRound,
  DOCTOR: Stethoscope,
  HOSPITAL: Building2,
  LAB: FlaskConical,
  PHARMACIST: Pill,
};

export default function SignupPage() {
  return (
    <SignupLayout
      eyebrow="Create account"
      title="What type of account are you creating?"
      description="Choose the account type that best describes you or your organization."
    >
      <div className="space-y-3">
        {ROLES.map((role) => {
          const config = getRoleConfig(role);
          const Icon = ICONS[role];

          return (
            <Link
              key={role}
              href={config.signupPath}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-cyan-600 hover:bg-cyan-50/40"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <Icon size={20} />
              </span>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {config.label}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {config.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        {"Already have an account? "}
        <Link
          href="/login"
          className="font-semibold text-cyan-700 hover:text-cyan-800"
        >
          Sign in
        </Link>
      </p>
    </SignupLayout>
  );
}