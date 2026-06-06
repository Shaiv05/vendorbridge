import { ShieldCheck, Briefcase, Crown, Building2 } from "lucide-react";
import { ROLE_LABEL, type Role } from "@/types/user";
import { cn } from "@/lib/utils";

const styles: Record<Role, { bg: string; text: string; ring: string; icon: typeof Crown }> = {
  ADMIN: { bg: "bg-violet/10", text: "text-violet", ring: "ring-violet/30", icon: Crown },
  PROCUREMENT_OFFICER: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/30", icon: Briefcase },
  MANAGER: { bg: "bg-success/10", text: "text-success", ring: "ring-success/30", icon: ShieldCheck },
  VENDOR: { bg: "bg-warning/15", text: "text-warning", ring: "ring-warning/30", icon: Building2 },
};

export function RoleBadge({ role, lg }: { role: Role; lg?: boolean }) {
  const s = styles[role];
  const I = s.icon;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full ring-1 font-semibold", s.bg, s.text, s.ring, lg ? "px-3 py-1.5 text-sm" : "px-2.5 py-1 text-xs")}>
      <I className={lg ? "h-4 w-4" : "h-3 w-3"} /> {ROLE_LABEL[role]}
    </span>
  );
}
