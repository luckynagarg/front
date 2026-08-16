"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupAs } from "@/lib/auth";
import { getRoleConfig, type Role } from "@/lib/roles";
import Input from "@/components/ui/Input";

const FIELDS: Record<Role, { label: string; key: string; type?: string }[]> = {
  PATIENT: [
    { label: "Full Name", key: "name" },
    { label: "Email", key: "email", type: "email" },
    { label: "Password", key: "password", type: "password" },
    { label: "Date of Birth", key: "dob", type: "date" },
    { label: "Gender", key: "gender" },
    { label: "Phone", key: "phone", type: "tel" },
    { label: "Emergency Contact", key: "emergency", type: "tel" },
  ],
  DOCTOR: [
    { label: "Full Name", key: "name" },
    { label: "Email", key: "email", type: "email" },
    { label: "Password", key: "password", type: "password" },
    { label: "Phone", key: "phone", type: "tel" },
    { label: "Professional ID", key: "professionalId" },
    { label: "Specialization", key: "specialization" },
    { label: "Qualification", key: "qualification" },
    { label: "Hospital / Clinic", key: "hospital" },
    { label: "Experience (years)", key: "experience" },
  ],
  HOSPITAL: [
    { label: "Organization Name", key: "name" },
    { label: "Email", key: "email", type: "email" },
    { label: "Password", key: "password", type: "password" },
    { label: "Phone", key: "phone", type: "tel" },
    { label: "Address", key: "address" },
    { label: "Registration Number", key: "registration" },
    { label: "Administrator Name", key: "admin" },
  ],
  LAB: [
    { label: "Laboratory Name", key: "name" },
    { label: "Email", key: "email", type: "email" },
    { label: "Password", key: "password", type: "password" },
    { label: "Phone", key: "phone", type: "tel" },
    { label: "Address", key: "address" },
    { label: "Registration Number", key: "registration" },
    { label: "Contact Person", key: "contact" },
  ],
  PHARMACIST: [
    { label: "Pharmacy Name", key: "name" },
    { label: "Email", key: "email", type: "email" },
    { label: "Password", key: "password", type: "password" },
    { label: "Phone", key: "phone", type: "tel" },
    { label: "Address", key: "address" },
    { label: "License Number", key: "license" },
    { label: "Pharmacist Name", key: "pharmacist" },
  ],
};

export default function SignupForm({ role }: { role: Role }) {
  const router = useRouter();
  const config = getRoleConfig(role);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  const setValue = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!values.name?.trim() || !values.email?.trim() || !values.password) {
      setError("Please fill in the required fields.");
      return;
    }

    // Frontend-only mock signup.
    signupAs(values.name.trim(), role, values.email.trim());
    router.push(config.home);
    router.refresh();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      {FIELDS[role].map((field) => (
        <Input
          key={field.key}
          id={field.key}
          label={field.label}
          type={field.type ?? "text"}
          value={values[field.key] ?? ""}
          onChange={(event) => setValue(field.key, event.target.value)}
          placeholder={field.label}
        />
      ))}

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="h-12 w-full rounded-xl bg-slate-950 text-sm font-semibold text-white transition hover:bg-slate-800"
      >
        Create {config.label} account
      </button>
    </form>
  );
}