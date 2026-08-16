// Dashboard-specific mock data and types for the HealthO patient portal.

export type VerificationStatus = "verified" | "pending" | "rejected";

export interface Verification {
  status: VerificationStatus;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface MedicalReport {
  id: string;
  title: string;
  type: string;
  date: string;
  fileName: string;
  notes?: string;
  verification: Verification;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  type: "In-person" | "Video consultation";
  location: string;
  status: "Confirmed" | "Pending" | "Completed" | "Cancelled";
}

export interface LabRegistration {
  id: string;
  testName: string;
  collectionMethod: "Home Sample Collection" | "Visit Lab";
  date: string;
  time: string;
  address?: string;
  status: "Confirmed";
}

export interface PatientProfile {
  name: string;
  patientId: string;
  cardNumber: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  email: string;
  phone: string;
  address: string;
  accountCreated: string;
  verifiedBy: string;
  verifiedAt: string;
  initials: string;
}

export const currentUser: PatientProfile = {
  name: "Harry",
  patientId: "HO-2026-00123",
  cardNumber: "HO-PAT-00123",
  dateOfBirth: "26 jan 1947",
  gender: "E-Male",
  bloodGroup: "O+",
  email: "harry@example.com",
  phone: "+91 98765 43210",
  address: "hapur chungi se rajnagar se kahin toh h suar",
  accountCreated: "15 aug 2026",
  verifiedBy: "Dr. lucky ",
  verifiedAt: "16 Aug 2026",
  initials: "SH",
};

export const reportTypes = [
  "Diagnostic Report",
  "Lab Report",
  "Imaging Report",
  "Prescription",
  "Consultation Summary",
  "Other",
];

export const labTests = [
  "CBC",
  "Lipid Profile",
  "Blood Sugar",
  "Thyroid Profile",
  "Liver Function Test",
  "Kidney Function Test",
];

export const initialReports: MedicalReport[] = [
  {
    id: "RPT-001",
    title: "Blood Test Report",
    type: "Diagnostic Report",
    date: "16 Aug 2026",
    fileName: "blood-test-report.pdf",
    notes: "Complete blood count and routine blood panel.",
    verification: {
      status: "verified",
      verifiedBy: "Dr. lucky ",
      verifiedAt: "16 Aug 2026",
    },
  },
  {
    id: "RPT-002",
    title: "X-Ray Report",
    type: "Imaging Report",
    date: "12 Aug 2026",
    fileName: "xray-report.jpg",
    notes: "Butt X-ray, back view.",
    verification: {
        status: "verified",
        verifiedBy: "Dr. lucky ",
        verifiedAt: "12 Aug 2026",
    },
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: "APT-001",
    doctorId: "alex-verma",
    doctorName: "Dr. Alex Verma",
    specialization: "General Physician",
    date: "18 Aug 2026",
    time: "10:30 AM",
    type: "In-person",
    location: "HealthO Care Centre, Delhi",
    status: "Confirmed",
  },
  {
    id: "APT-002",
    doctorId: "sarah-khan",
    doctorName: "Dr. Sarah Khan",
    specialization: "Cardiologist",
    date: "25 Aug 2026",
    time: "02:00 PM",
    type: "Video consultation",
    location: "Online",
    status: "Pending",
  },
];

export const initialLabRegistrations: LabRegistration[] = [
  {
    id: "LAB-2026-00127",
    testName: "CBC",
    collectionMethod: "Home Sample Collection",
    date: "17 Aug 2026",
    time: "8:00 AM – 9:00 AM",
    address: "123 Healthcare Street, Delhi 110001",
    status: "Confirmed",
  },
];

export const mockDoctors = [
  {
    id: "alex-verma",
    name: "Dr. Alex Verma",
    specialization: "General Physician",
    initials: "AV",
  },
  {
    id: "sarah-khan",
    name: "Dr. Sarah Khan",
    specialization: "Cardiologist",
    initials: "SK",
  },
  {
    id: "rahul-mehta",
    name: "Dr. Rahul Mehta",
    specialization: "Dermatologist",
    initials: "RM",
  },
];

export const appointmentSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
];

export const labTimeSlots = [
  "8:00 AM – 9:00 AM",
  "9:00 AM – 10:00 AM",
  "10:00 AM – 11:00 AM",
  "11:00 AM – 12:00 PM",
  "2:00 PM – 3:00 PM",
  "3:00 PM – 4:00 PM",
];