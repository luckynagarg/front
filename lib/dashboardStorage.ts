// Client-side persistence layer for the HealthO patient portal.
// Uses localStorage so data survives page navigation (no backend yet).

import {
  currentUser,
  initialAppointments,
  initialLabRegistrations,
  initialReports,
  type Appointment,
  type LabRegistration,
  type MedicalReport,
  type PatientProfile,
} from "./dashboardData";

const KEYS = {
  session: "healtho_session",
  reports: "healtho_reports",
  appointments: "healtho_appointments",
  labRegistrations: "healtho_lab_registrations",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors (e.g. private mode).
  }
}

// --- Session / auth -------------------------------------------------------

export function isLoggedIn(): boolean {
  return read<boolean>(KEYS.session, false);
}

export function login(): void {
  write(KEYS.session, true);
}

export function logout(): void {
  write(KEYS.session, false);
}

// --- Reports --------------------------------------------------------------

export function getReports(): MedicalReport[] {
  return read<MedicalReport[]>(KEYS.reports, initialReports);
}

export function addReport(report: MedicalReport): MedicalReport[] {
  const reports = [report, ...getReports()];
  write(KEYS.reports, reports);
  return reports;
}

// --- Appointments ---------------------------------------------------------

export function getAppointments(): Appointment[] {
  return read<Appointment[]>(KEYS.appointments, initialAppointments);
}

export function addAppointment(
  appointment: Appointment,
): Appointment[] {
  const appointments = [...getAppointments(), appointment];
  write(KEYS.appointments, appointments);
  return appointments;
}

export function cancelAppointment(id: string): Appointment[] {
  const appointments = getAppointments().map((appointment) =>
    appointment.id === id
      ? { ...appointment, status: "Cancelled" as const }
      : appointment,
  );
  write(KEYS.appointments, appointments);
  return appointments;
}

// --- Lab registrations ----------------------------------------------------

export function getLabRegistrations(): LabRegistration[] {
  return read<LabRegistration[]>(
    KEYS.labRegistrations,
    initialLabRegistrations,
  );
}

export function addLabRegistration(
  registration: LabRegistration,
): LabRegistration[] {
  const registrations = [
    ...getLabRegistrations(),
    registration,
  ];
  write(KEYS.labRegistrations, registrations);
  return registrations;
}

// --- User profile ---------------------------------------------------------

export function getUser(): PatientProfile {
  return currentUser;
}

// --- ID helpers -----------------------------------------------------------

export function nextReportId(): string {
  return `RPT-${Date.now().toString().slice(-6)}`;
}

export function nextAppointmentId(): string {
  return `APT-${Date.now().toString().slice(-6)}`;
}

export function nextLabId(): string {
  return `LAB-2026-${Math.floor(10000 + Math.random() * 89999)}`;
}