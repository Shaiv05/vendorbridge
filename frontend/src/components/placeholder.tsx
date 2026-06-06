"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Placeholder({ title, description, icon, cta }: { title: string; description: string; icon: ReactNode; cta?: string }) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
        {cta && <button className="inline-flex items-center gap-2 rounded-md bg-gradient-primary text-white px-4 h-10 text-sm font-semibold shadow-elegant">{cta}</button>}
      </motion.div>
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
        className="rounded-2xl border border-dashed border-border bg-card p-16 text-center shadow-card">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-primary grid place-items-center text-white shadow-elegant">{icon}</div>
        <h2 className="mt-6 text-xl font-bold">Coming in the next phase</h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">This module is part of Phase 2.</p>
      </motion.div>
    </div>
  );
}
