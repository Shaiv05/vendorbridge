import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { VENDOR_STATUS_LABEL, type VendorStatus } from "@/types/vendor";
import { cn } from "@/lib/utils";

const styles: Record<VendorStatus, { bg: string; text: string; ring: string; icon: typeof CheckCircle2 }> = {
  ACTIVE: { bg: "bg-success/10", text: "text-success", ring: "ring-success/30", icon: CheckCircle2 },
  INACTIVE: { bg: "bg-muted", text: "text-muted-foreground", ring: "ring-border", icon: XCircle },
  BLACKLISTED: { bg: "bg-destructive/10", text: "text-destructive", ring: "ring-destructive/30", icon: AlertTriangle },
};

export function StatusBadge({ status }: { status: VendorStatus }) {
  const s = styles[status];
  const I = s.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full ring-1 px-2.5 py-0.5 text-xs font-semibold", s.bg, s.text, s.ring)}>
      <I className="h-3 w-3" /> {VENDOR_STATUS_LABEL[status]}
    </span>
  );
}
