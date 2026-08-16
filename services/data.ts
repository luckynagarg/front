// Shared healthcare data models and localStorage-backed services.
// Designed to be swapped for a real API later.

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  address: string;
  emergencyContact?: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  qualification: string;
  hospital: string;
  experience: string;
  registrationId: string;
  role: "DOCTOR";
  initials?: string;
}

export interface Hospital {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  adminName: string;
  registrationId: string;
  role: "HOSPITAL";
}

export interface Lab {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  adminName: string;
  registrationId: string;
  role: "LAB";
}

export interface Pharmacy {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  pharmacistName: string;
  licenseNumber: string;
  role: "PHARMACIST";
}

export interface Allergy {
  id: string;
  patientId: string;
  name: string;
  type: string;
  severity: "Mild" | "Moderate" | "Severe";
  reaction: string;
  status: "Active" | "Resolved";
  addedBy: string;
  addedAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  medicines: Medicine[];
  diagnosis: string;
  notes: string;
  createdAt: string;
  status: "Pending" | "Processing" | "Dispensed" | "Completed";
  prescribedBy: string;
}

export interface Medicine {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface LabReport {
  id: string;
  patientId: string;
  doctorId?: string;
  testName: string;
  reportType: string;
  date: string;
  fileName: string;
  notes?: string;
  status: "Requested" | "Scheduled" | "In Progress" | "Uploaded" | "Under Review" | "Reviewed";
  uploadedBy?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
}

export interface AccessGrant {
  id: string;
  patientId: string;
  providerId: string;
  providerName: string;
  providerRole: string;
  permissions: string[];
  status: "Active" | "Revoked";
  grantedAt: string;
  revokedAt?: string;
}

export interface Appointment {
  id: string;
  patientId?: string;
  doctorId?: string;
  hospitalId?: string;
  labId?: string;
  participantName: string;
  participantRole: string;
  date: string;
  time: string;
  type: string;
  status: "Requested" | "Confirmed" | "Upcoming" | "Completed" | "Cancelled" | "Rescheduled";
  reason?: string;
  notes?: string;
  relatedTest?: string;
  relatedPrescriptionId?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
}

const KEYS = {
  patients: "healtho_patients",
  doctors: "healtho_doctors",
  hospitals: "healtho_hospitals",
  labs: "healtho_labs",
  pharmacies: "healtho_pharmacies",
  allergies: "healtho_allergies",
  prescriptions: "healtho_prescriptions",
  labReports: "healtho_lab_reports",
  accessGrants: "healtho_access_grants",
  appointments: "healtho_appointments",
  notifications: "healtho_notifications",
};

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
    // ignore
  }
}

// --- Patients ---
export function getPatients(): Patient[] {
  return read<Patient[]>(KEYS.patients, []);
}

export function getPatient(id: string): Patient | undefined {
  return getPatients().find((p) => p.id === id);
}

export function addPatient(patient: Patient): Patient[] {
  const patients = [patient, ...getPatients()];
  write(KEYS.patients, patients);
  return patients;
}

// --- Doctors ---
export function getDoctors(): Doctor[] {
  return read<Doctor[]>(KEYS.doctors, []);
}

export function getDoctor(id: string): Doctor | undefined {
  return getDoctors().find((d) => d.id === id);
}

export function addDoctor(doctor: Doctor): Doctor[] {
  const doctors = [doctor, ...getDoctors()];
  write(KEYS.doctors, doctors);
  return doctors;
}

// --- Hospitals ---
export function getHospitals(): Hospital[] {
  return read<Hospital[]>(KEYS.hospitals, []);
}

export function getHospital(id: string): Hospital | undefined {
  return getHospitals().find((h) => h.id === id);
}

export function addHospital(hospital: Hospital): Hospital[] {
  const hospitals = [hospital, ...getHospitals()];
  write(KEYS.hospitals, hospitals);
  return hospitals;
}

// --- Labs ---
export function getLabs(): Lab[] {
  return read<Lab[]>(KEYS.labs, []);
}

export function getLab(id: string): Lab | undefined {
  return getLabs().find((l) => l.id === id);
}

export function addLab(lab: Lab): Lab[] {
  const labs = [lab, ...getLabs()];
  write(KEYS.labs, labs);
  return labs;
}

// --- Pharmacies ---
export function getPharmacies(): Pharmacy[] {
  return read<Pharmacy[]>(KEYS.pharmacies, []);
}

export function getPharmacy(id: string): Pharmacy | undefined {
  return getPharmacies().find((p) => p.id === id);
}

export function addPharmacy(pharmacy: Pharmacy): Pharmacy[] {
  const pharmacies = [pharmacy, ...getPharmacies()];
  write(KEYS.pharmacies, pharmacies);
  return pharmacies;
}

// --- Allergies ---
export function getAllergies(patientId: string): Allergy[] {
  return getAllergiesRaw().filter((a) => a.patientId === patientId);
}

export function getAllergiesRaw(): Allergy[] {
  return read<Allergy[]>(KEYS.allergies, []);
}

export function addAllergy(allergy: Allergy): Allergy[] {
  const allergies = [allergy, ...getAllergiesRaw()];
  write(KEYS.allergies, allergies);
  return allergies;
}

// --- Prescriptions ---
export function getPrescriptions(patientId?: string): Prescription[] {
  const all = read<Prescription[]>(KEYS.prescriptions, []);
  if (!patientId) return all;
  return all.filter((p) => p.patientId === patientId);
}

export function getPrescription(id: string): Prescription | undefined {
  return getPrescriptions().find((p) => p.id === id);
}

export function addPrescription(prescription: Prescription): Prescription[] {
  const prescriptions = [prescription, ...getPrescriptions()];
  write(KEYS.prescriptions, prescriptions);
  return prescriptions;
}

export function updatePrescriptionStatus(
  id: string,
  status: Prescription["status"]
): Prescription[] {
  const prescriptions = getPrescriptions().map((p) =>
    p.id === id ? { ...p, status } : p
  );
  write(KEYS.prescriptions, prescriptions);
  return prescriptions;
}

// --- Lab Reports ---
export function getLabReports(patientId?: string): LabReport[] {
  const all = read<LabReport[]>(KEYS.labReports, []);
  if (!patientId) return all;
  return all.filter((r) => r.patientId === patientId);
}

export function getLabReport(id: string): LabReport | undefined {
  return getLabReports().find((r) => r.id === id);
}

export function addLabReport(report: LabReport): LabReport[] {
  const reports = [report, ...getLabReports()];
  write(KEYS.labReports, reports);
  return reports;
}

export function updateLabReportStatus(
  id: string,
  status: LabReport["status"],
  reviewedBy?: string
): LabReport[] {
  const reports = getLabReports().map((r) =>
    r.id === id
      ? {
          ...r,
          status,
          reviewedBy,
          reviewedAt:
            status === "Reviewed"
              ? new Date().toISOString()
              : r.reviewedAt,
        }
      : r
  );
  write(KEYS.labReports, reports);
  return reports;
}

// --- Access Grants ---
export function getAccessGrants(patientId: string): AccessGrant[] {
  return read<AccessGrant[]>(KEYS.accessGrants, []).filter(
    (g) => g.patientId === patientId
  );
}

export function addAccessGrant(grant: AccessGrant): AccessGrant[] {
  const grants = [grant, ...read<AccessGrant[]>(KEYS.accessGrants, [])];
  write(KEYS.accessGrants, grants);
  return grants;
}

export function revokeAccessGrant(id: string): AccessGrant[] {
  const grants = read<AccessGrant[]>(KEYS.accessGrants, []).map((g) =>
    g.id === id
      ? {
          ...g,
          status: "Revoked" as const,
          revokedAt: new Date().toISOString(),
        }
      : g
  );
  write(KEYS.accessGrants, grants);
  return grants;
}

// --- Appointments ---
export function getAppointments(filters?: {
  patientId?: string;
  doctorId?: string;
  labId?: string;
}): Appointment[] {
  let all = read<Appointment[]>(KEYS.appointments, []);
  if (filters?.patientId) all = all.filter((a) => a.patientId === filters.patientId);
  if (filters?.doctorId) all = all.filter((a) => a.doctorId === filters.doctorId);
  if (filters?.labId) all = all.filter((a) => a.labId === filters.labId);
  return all;
}

export function getAppointment(id: string): Appointment | undefined {
  return getAppointments().find((a) => a.id === id);
}

export function addAppointment(appointment: Appointment): Appointment[] {
  const appointments = [appointment, ...getAppointments()];
  write(KEYS.appointments, appointments);
  return appointments;
}

export function updateAppointmentStatus(
  id: string,
  status: Appointment["status"]
): Appointment[] {
  const appointments = getAppointments().map((a) =>
    a.id === id ? { ...a, status } : a
  );
  write(KEYS.appointments, appointments);
  return appointments;
}

export function cancelAppointment(id: string): Appointment[] {
  const appointments = getAppointments().map((appointment) =>
    appointment.id === id
      ? { ...appointment, status: "Cancelled" as const }
      : appointment
  );
  write(KEYS.appointments, appointments);
  return appointments;
}

// --- Notifications ---
export function getNotifications(userId: string): Notification[] {
  return read<Notification[]>(KEYS.notifications, []).filter(
    (n) => n.userId === userId
  );
}

export function addNotification(
  notification: Notification
): Notification[] {
  const notifications = [
    notification,
    ...read<Notification[]>(KEYS.notifications, []),
  ];
  write(KEYS.notifications, notifications);
  return notifications;
}

export function markNotificationRead(id: string): Notification[] {
  const notifications = read<Notification[]>(KEYS.notifications, []).map(
    (n) => (n.id === id ? { ...n, read: true } : n)
  );
  write(KEYS.notifications, notifications);
  return notifications;
}

// --- Seed data ---
export function seedDataIfEmpty() {
  if (typeof window === "undefined") return;

  if (getPatients().length === 0) {
    addPatient({
      id: "PAT-001",
      name: "Harry",
      email: "harry@example.com",
      phone: "+91 98765 43210",
      dateOfBirth: "2001-05-12",
      gender: "Male",
      bloodGroup: "O+",
      address: "123 Healthcare Street, Delhi 110001",
      emergencyContact: "+91 98765 43211",
      createdAt: "2026-01-14",
    });
  }

  if (getDoctors().length === 0) {
    addDoctor({
      id: "DOC-001",
      name: "Dr. Alex Verma",
      email: "alex.verma@healtho.com",
      phone: "+91 98765 00001",
      specialization: "General Physician",
      qualification: "MBBS, MD",
      hospital: "HealthO Care Centre, Delhi",
      experience: "12 years",
      registrationId: "MED-12345",
      role: "DOCTOR",
      initials: "AV",
    });
    addDoctor({
      id: "DOC-002",
      name: "Dr. Sarah Khan",
      email: "sarah.khan@healtho.com",
      phone: "+91 98765 00002",
      specialization: "Cardiologist",
      qualification: "MBBS, MD, DM",
      hospital: "HealthO Heart Institute",
      experience: "15 years",
      registrationId: "MED-12346",
      role: "DOCTOR",
      initials: "SK",
    });
    addDoctor({
      id: "DOC-003",
      name: "Dr. Rahul Mehta",
      email: "rahul.mehta@healtho.com",
      phone: "+91 98765 00003",
      specialization: "Dermatologist",
      qualification: "MBBS, MD",
      hospital: "HealthO Skin Clinic",
      experience: "8 years",
      registrationId: "MED-12347",
      role: "DOCTOR",
      initials: "RM",
    });
  }

  if (getLabs().length === 0) {
    addLab({
      id: "LAB-001",
      name: "HealthO Diagnostics",
      email: "lab@healtho.com",
      phone: "+91 98765 00010",
      address: "45 Lab Street, Delhi 110001",
      adminName: "Lab Admin",
      registrationId: "LAB-12345",
      role: "LAB",
    });
  }

  if (getPharmacies().length === 0) {
    addPharmacy({
      id: "PHARM-001",
      name: "HealthO Pharmacy",
      email: "pharmacy@healtho.com",
      phone: "+91 98765 00020",
      address: "78 Pharmacy Lane, Delhi 110001",
      pharmacistName: "Pharmacist Raj",
      licenseNumber: "PH-12345",
      role: "PHARMACIST",
    });
  }
}

// --- ID helpers ---
export function nextId(prefix: string): string {
  return `${prefix}-${Date.now().toString().slice(-6)}`;
}
