import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import type { VerificationStatus } from "@/lib/dashboardData";

const styles: Record<
  VerificationStatus,
  { label: string; className: string; Icon: typeof CheckCircle2 }
> = {
  verified: {
    label: "Verified",
    className: "bg-emerald-50 text-emerald-700",
    Icon: CheckCircle2,
  },
  pending: {
    label: "Pending Verification",
    className: "bg-amber-50 text-amber-700",
    Icon: Clock3,
  },
  rejected: {
    label: "Not Verified",
    className: "bg-red-50 text-red-700",
    Icon: XCircle,
  },
};

export default function VerificationBadge({
  status,
  className = "",
}: {
  status: VerificationStatus;
  className?: string;
}) {
  const { label, className: tone, Icon } = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${tone} ${className}`}
    >
      <Icon size={13} />
      {label}
    </span>
  );
}