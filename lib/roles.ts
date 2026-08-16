// Role definitions and role-specific configuration for HealthO.

export type Role =
  | "PATIENT"
  | "DOCTOR"
  | "HOSPITAL"
  | "LAB"
  | "PHARMACIST";

export interface RoleConfig {
  label: string;
  description: string;
  home: string;
  signupPath: string;
  nav: { label: string; href: string }[];
}

export const ROLE_CONFIG: Record<Role, RoleConfig> = {
  PATIENT: {
    label: "Patient / User",
    description: "Manage your health, appointments and records.",
    home: "/patient/dashboard",
    signupPath: "/signup/patient",
    nav: [
      { label: "Dashboard", href: "/patient/dashboard" },
      { label: "Appointments", href: "/patient/appointments" },
      { label: "Doctors", href: "/patient/doctors" },
      { label: "Prescriptions", href: "/patient/prescriptions" },
      { label: "Reports", href: "/patient/reports" },
      { label: "Medical Records", href: "/patient/medical-records" },
      { label: "Access & Privacy", href: "/patient/access" },
      { label: "Profile", href: "/patient/profile" },
    ],
  },
  DOCTOR: {
    label: "Doctor",
    description: "Manage patients, appointments and clinical care.",
    home: "/doctor/dashboard",
    signupPath: "/signup/doctor",
    nav: [
      { label: "Dashboard", href: "/doctor/dashboard" },
      { label: "Patients", href: "/doctor/patients" },
      { label: "Appointments", href: "/doctor/appointments" },
      { label: "Prescriptions", href: "/doctor/prescriptions" },
      { label: "Reports", href: "/doctor/reports" },
      { label: "Requests", href: "/doctor/requests" },
      { label: "Profile", href: "/doctor/profile" },
    ],
  },
  HOSPITAL: {
    label: "Hospital / Clinic",
    description: "Manage patients and appointments organizationally.",
    home: "/hospital/dashboard",
    signupPath: "/signup/hospital",
    nav: [
      { label: "Dashboard", href: "/hospital/dashboard" },
      { label: "Patients", href: "/hospital/patients" },
      { label: "Appointments", href: "/hospital/appointments" },
      { label: "Reports", href: "/hospital/reports" },
      { label: "Profile", href: "/hospital/profile" },
    ],
  },
  LAB: {
    label: "Laboratory",
    description: "Manage tests, appointments and lab reports.",
    home: "/lab/dashboard",
    signupPath: "/signup/lab",
    nav: [
      { label: "Dashboard", href: "/lab/dashboard" },
      { label: "Appointments", href: "/lab/appointments" },
      { label: "Tests", href: "/lab/tests" },
      { label: "Reports", href: "/lab/reports" },
      { label: "Profile", href: "/lab/profile" },
    ],
  },
  PHARMACIST: {
    label: "Pharmacist / Pharmacy",
    description: "Process prescriptions and manage orders.",
    home: "/pharmacy/dashboard",
    signupPath: "/signup/pharmacy",
    nav: [
      { label: "Dashboard", href: "/pharmacy/dashboard" },
      { label: "Prescriptions", href: "/pharmacy/prescriptions" },
      { label: "Orders", href: "/pharmacy/orders" },
      { label: "History", href: "/pharmacy/history" },
      { label: "Profile", href: "/pharmacy/profile" },
    ],
  },
};

export const ROLES: Role[] = [
  "PATIENT",
  "DOCTOR",
  "HOSPITAL",
  "LAB",
  "PHARMACIST",
];

export function getRoleConfig(role: Role): RoleConfig {
  return ROLE_CONFIG[role];
}