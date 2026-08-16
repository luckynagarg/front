// Centralized permission system for HealthO.
// Maps roles to permissions. Client-side checks are UX-only;
// a real backend must enforce these authorizations.

import type { Role } from "./roles";

export type Permission =
  | "VIEW_PROFILE"
  | "VIEW_MEDICAL_HISTORY"
  | "VIEW_ALLERGIES"
  | "VIEW_PRESCRIPTION"
  | "VIEW_LAB_REPORT"
  | "VIEW_APPOINTMENT"
  | "MANAGE_APPOINTMENT"
  | "CREATE_PRESCRIPTION"
  | "UPDATE_PRESCRIPTION"
  | "DISPENSE_PRESCRIPTION"
  | "CREATE_DIAGNOSIS"
  | "UPDATE_ALLERGIES"
  | "REVIEW_REPORT"
  | "UPLOAD_REPORT"
  | "REQUEST_TEST"
  | "MANAGE_ACCESS"
  | "VIEW_PATIENTS"
  | "VIEW_ORDERS";

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  PATIENT: [
    "VIEW_PROFILE",
    "VIEW_MEDICAL_HISTORY",
    "VIEW_ALLERGIES",
    "VIEW_PRESCRIPTION",
    "VIEW_LAB_REPORT",
    "VIEW_APPOINTMENT",
    "MANAGE_APPOINTMENT",
    "MANAGE_ACCESS",
  ],
  DOCTOR: [
    "VIEW_PROFILE",
    "VIEW_MEDICAL_HISTORY",
    "VIEW_ALLERGIES",
    "VIEW_PRESCRIPTION",
    "VIEW_LAB_REPORT",
    "VIEW_APPOINTMENT",
    "MANAGE_APPOINTMENT",
    "CREATE_PRESCRIPTION",
    "UPDATE_PRESCRIPTION",
    "CREATE_DIAGNOSIS",
    "UPDATE_ALLERGIES",
    "REVIEW_REPORT",
    "REQUEST_TEST",
    "VIEW_PATIENTS",
  ],
  HOSPITAL: [
    "VIEW_PROFILE",
    "VIEW_MEDICAL_HISTORY",
    "VIEW_PRESCRIPTION",
    "VIEW_LAB_REPORT",
    "VIEW_APPOINTMENT",
    "MANAGE_APPOINTMENT",
    "VIEW_PATIENTS",
  ],
  LAB: [
    "VIEW_PROFILE",
    "VIEW_LAB_REPORT",
    "VIEW_APPOINTMENT",
    "MANAGE_APPOINTMENT",
    "UPLOAD_REPORT",
    "REVIEW_REPORT",
    "REQUEST_TEST",
  ],
  PHARMACIST: [
    "VIEW_PROFILE",
    "VIEW_PRESCRIPTION",
    "DISPENSE_PRESCRIPTION",
    "VIEW_ORDERS",
  ],
};

export function hasPermission(
  role: Role | null | undefined,
  permission: Permission,
): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role];
}