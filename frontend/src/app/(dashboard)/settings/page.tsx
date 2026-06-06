"use client";
import { motion } from "framer-motion";
import { useAuth } from "@/features/auth/auth-context";
import { ROLE_LABEL } from "@/types/user";
import { RoleBadge } from "@/components/role-badge";
import { Button } from "@/components/ui/primitives";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your VendorBridge account.</p>
      </motion.div>
      <div className="rounded-2xl border border-border bg-card shadow-card p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center text-white text-xl font-bold shadow-elegant">
            {(user.first_name[0] ?? "") + (user.last_name[0] ?? "")}
          </div>
          <div>
            <div className="text-lg font-bold">{user.full_name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div className="mt-2"><RoleBadge role={user.role} /></div>
          </div>
        </div>
        <hr className="border-border" />
        {[
          ["First name", user.first_name],
          ["Last name",  user.last_name],
          ["Email",      user.email],
          ["Role",       ROLE_LABEL[user.role]],
        ].map(([k,v]) => (
          <div key={k} className="flex justify-between items-center py-2 text-sm">
            <span className="text-muted-foreground font-medium">{k}</span>
            <span className="font-semibold">{v}</span>
          </div>
        ))}
        <hr className="border-border" />
        <div className="flex justify-end"><Button variant="destructive" onClick={logout}>Sign out</Button></div>
      </div>
    </div>
  );
}
