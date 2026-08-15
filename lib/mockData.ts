export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  rating: number;
  reviews: number;
  location: string;
  consultationFee: number;
  about: string;
  availableToday: boolean;
  initials: string;
};

export const doctors: Doctor[] = [
  {
    id: "arjun-sharma",
    name: "Dr. Arjun Sharma",
    specialization: "Cardiologist",
    experience: "12 years",
    rating: 4.8,
    reviews: 124,
    location: "HealthO Heart Clinic, Delhi",
    consultationFee: 800,
    about:
      "Dr. Arjun Sharma is a senior cardiologist focused on preventive cardiology, heart health and comprehensive cardiac care.",
    availableToday: true,
    initials: "AS",
  },
  {
    id: "priya-mehta",
    name: "Dr. Priya Mehta",
    specialization: "Dermatologist",
    experience: "9 years",
    rating: 4.7,
    reviews: 98,
    location: "HealthO Skin Clinic, Delhi",
    consultationFee: 600,
    about:
      "Dr. Priya Mehta specializes in clinical dermatology and provides personalized care for common skin and hair conditions.",
    availableToday: true,
    initials: "PM",
  },
  {
    id: "rohan-kapoor",
    name: "Dr. Rohan Kapoor",
    specialization: "General Physician",
    experience: "15 years",
    rating: 4.9,
    reviews: 210,
    location: "HealthO Care Centre, Noida",
    consultationFee: 500,
    about:
      "Dr. Rohan Kapoor provides primary healthcare, preventive consultations and general medical guidance for patients of all ages.",
    availableToday: false,
    initials: "RK",
  },
  {
    id: "neha-verma",
    name: "Dr. Neha Verma",
    specialization: "Neurologist",
    experience: "11 years",
    rating: 4.8,
    reviews: 87,
    location: "HealthO Neuro Centre, Delhi",
    consultationFee: 1000,
    about:
      "Dr. Neha Verma focuses on neurological consultations, headache management and long-term neurological care.",
    availableToday: true,
    initials: "NV",
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

export const appointments = [
  {
    id: "APT-001",
    doctorId: "arjun-sharma",
    doctorName: "Dr. Arjun Sharma",
    specialization: "Cardiologist",
    date: "18 Aug 2026",
    time: "10:30 AM",
    status: "Confirmed",
    type: "In-person",
    location: "HealthO Heart Clinic, Delhi",
  },
  {
    id: "APT-002",
    doctorId: "priya-mehta",
    doctorName: "Dr. Priya Mehta",
    specialization: "Dermatologist",
    date: "25 Aug 2026",
    time: "02:00 PM",
    status: "Pending",
    type: "Video consultation",
    location: "Online",
  },
];

export const prescriptions = [
  {
    id: "RX-001",
    doctor: "Dr. Arjun Sharma",
    specialization: "Cardiologist",
    date: "12 Aug 2026",
    diagnosis: "General cardiac wellness",
    medicines: [
      {
        name: "Medicine A",
        dosage: "1 tablet",
        frequency: "Once daily",
        duration: "10 days",
        instruction: "After breakfast",
      },
      {
        name: "Medicine B",
        dosage: "1 tablet",
        frequency: "Twice daily",
        duration: "7 days",
        instruction: "After meals",
      },
    ],
    notes:
      "Maintain regular sleep, hydration and follow the recommended lifestyle changes.",
  },
  {
    id: "RX-002",
    doctor: "Dr. Rohan Kapoor",
    specialization: "General Physician",
    date: "02 Aug 2026",
    diagnosis: "Seasonal illness",
    medicines: [
      {
        name: "Medicine C",
        dosage: "1 tablet",
        frequency: "Twice daily",
        duration: "5 days",
        instruction: "After meals",
      },
    ],
    notes:
      "Rest well and maintain adequate hydration. Follow up if symptoms persist.",
  },
];

export const labReports = [
  {
    id: "LAB-001",
    testName: "Complete Blood Count",
    laboratory: "HealthO Diagnostics",
    date: "10 Aug 2026",
    status: "Normal",
    doctor: "Dr. Arjun Sharma",
    results: [
      { parameter: "Hemoglobin", value: "14.2", unit: "g/dL", range: "13–17" },
      { parameter: "WBC Count", value: "7.4", unit: "10³/µL", range: "4–11" },
      { parameter: "Platelets", value: "245", unit: "10³/µL", range: "150–450" },
    ],
  },
  {
    id: "LAB-002",
    testName: "Blood Sugar",
    laboratory: "HealthO Diagnostics",
    date: "28 Jul 2026",
    status: "Normal",
    doctor: "Dr. Rohan Kapoor",
    results: [
      { parameter: "Fasting Glucose", value: "96", unit: "mg/dL", range: "70–100" },
    ],
  },
  {
    id: "LAB-003",
    testName: "Lipid Profile",
    laboratory: "HealthO Diagnostics",
    date: "20 Jul 2026",
    status: "Review",
    doctor: "Dr. Arjun Sharma",
    results: [
      { parameter: "Total Cholesterol", value: "188", unit: "mg/dL", range: "<200" },
      { parameter: "HDL", value: "52", unit: "mg/dL", range: ">40" },
      { parameter: "LDL", value: "108", unit: "mg/dL", range: "<100" },
    ],
  },
];