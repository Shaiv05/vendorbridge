"use client";

import { motion } from "framer-motion";
import { 
  Users, FileText, CheckSquare, Receipt, Plus, FileSearch, 
  BarChart3, Sparkles, TrendingUp, ArrowUpRight, ArrowDownRight,
  Quote, Building2, Send
} from "lucide-react";
import { useAuth } from "@/features/auth/auth-context";
import { RoleBadge } from "@/components/role-badge";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  const isVendor = user?.role === "VENDOR";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-hero p-8 sm:p-10 text-white shadow-elegant">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold ring-1 ring-white/20">
              <Sparkles className="h-3 w-3" /> VendorBridge ERP
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-tight">{greet}, {user?.first_name}</h1>
            <p className="mt-3 text-white/80 text-lg max-w-lg">
              {isVendor 
                ? "Manage your assigned RFQs and track your submitted quotations." 
                : "Here's a snapshot of your procurement operations."}
            </p>
          </div>
          {user && <div className="flex flex-col gap-2 lg:items-end">
            <span className="text-[11px] uppercase tracking-wider text-white/60">Signed in as</span>
            <RoleBadge role={user.role} lg />
          </div>}
        </div>
      </motion.div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {isVendor ? (
          <>
            <Stat label="Open RFQs"        value={8}  trend={2}  accent="primary" icon={<FileText className="h-5 w-5" />} />
            <Stat label="Sent Quotes"      value={12} trend={5}  accent="violet"  icon={<Quote className="h-5 w-5" />} />
            <Stat label="Accepted Quotes"  value={3}  trend={0}  accent="success" icon={<CheckSquare className="h-5 w-5" />} />
            <Stat label="Pending Payment"  value={2}  trend={-1} accent="warning" icon={<Receipt className="h-5 w-5" />} />
          </>
        ) : (
          <>
            <Stat label="Total Vendors"     value={248} trend={12} accent="primary" icon={<Users className="h-5 w-5" />} />
            <Stat label="Active RFQs"       value={34}  trend={8}  accent="violet"  icon={<FileText className="h-5 w-5" />} />
            <Stat label="Pending Approvals" value={12}  trend={-3} accent="warning" icon={<CheckSquare className="h-5 w-5" />} />
            <Stat label="Invoices Generated" value={186} trend={24} accent="success" icon={<Receipt className="h-5 w-5" />} />
          </>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        {isVendor ? (
          <>
            <Action href="/quotations" title="Submit Quotation" desc="Respond to an open RFQ with your proposal." icon={<Send className="h-5 w-5" />} accent="primary" />
            <Action href="/rfqs"       title="View RFQs"         desc="Browse all requests assigned to your profile." icon={<FileSearch className="h-5 w-5" />} accent="violet" />
            <Action href="/settings"   title="Vendor Profile"    desc="Update your company details and category." icon={<Building2 className="h-5 w-5" />} accent="success" />
          </>
        ) : (
          <>
            <Action href="/vendors"  title="Add Vendor"   desc="Onboard a new supplier in under a minute." icon={<Plus className="h-5 w-5" />} accent="primary" />
            <Action href="/rfqs"     title="Create RFQ"   desc="Issue a request for quotation to vendors." icon={<FileSearch className="h-5 w-5" />} accent="violet" />
            <Action href="/reports"  title="View Reports" desc="Spend analytics, cycle time and trends."   icon={<BarChart3 className="h-5 w-5" />} accent="success" />
          </>
        )}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="rounded-2xl border border-border bg-card shadow-card p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center"><TrendingUp className="h-5 w-5" /></div>
          <div><h2 className="text-lg font-bold tracking-tight">Recent activity</h2>
            <p className="text-sm text-muted-foreground">Live activity feed coming in next phase.</p></div>
        </div>
        <div className="mt-6 h-48 rounded-xl bg-gradient-to-br from-muted to-muted/30 border border-border grid place-items-center text-sm text-muted-foreground">
          Detailed trends and analytics coming soon
        </div>
      </motion.div>
    </div>
  );
}

const ACCENT = {
  primary: "from-primary/15 to-primary/0 text-primary",
  violet: "from-violet/15 to-violet/0 text-violet",
  success: "from-success/15 to-success/0 text-success",
  warning: "from-warning/20 to-warning/0 text-warning",
} as const;

function Stat({ label, value, trend, accent, icon }: { label: string; value: number; trend: number; accent: keyof typeof ACCENT; icon: ReactNode }) {
  const up = trend >= 0;
  return (
    <motion.div whileHover={{ y: -4 }} className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-elegant transition-shadow">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60", ACCENT[accent])} />
      <div className="relative p-5">
        <div className="flex items-start justify-between">
          <div className={cn("h-10 w-10 rounded-xl grid place-items-center bg-background/80 backdrop-blur ring-1 ring-border", ACCENT[accent].split(" ").pop())}>{icon}</div>
          <span className={cn("inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-bold",
            up ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive")}>
            {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{Math.abs(trend)}%
          </span>
        </div>
        <div className="mt-6">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-1 text-3xl font-bold tracking-tight">{value.toLocaleString()}</div>
        </div>
      </div>
    </motion.div>
  );
}

function Action({ href, title, desc, icon, accent }: { href: string; title: string; desc: string; icon: ReactNode; accent: "primary" | "violet" | "success" }) {
  const map = { primary: "from-primary to-primary-glow", violet: "from-violet to-primary-glow", success: "from-success to-success" } as const;
  return (
    <Link href={href}>
      <motion.div whileHover={{ y: -3 }} className="h-full group relative overflow-hidden text-left rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant transition-shadow cursor-pointer">
        <div className={cn("absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-15 group-hover:opacity-25 blur-xl transition", map[accent])} />
        <div className={cn("relative h-12 w-12 rounded-xl text-white grid place-items-center shadow-elegant bg-gradient-to-br", map[accent])}>{icon}</div>
        <h3 className="relative mt-5 text-base font-bold">{title}</h3>
        <p className="relative mt-1 text-sm text-muted-foreground">{desc}</p>
        <div className="relative mt-5 text-xs font-semibold text-primary">Get started →</div>
      </motion.div>
    </Link>
  );
}
