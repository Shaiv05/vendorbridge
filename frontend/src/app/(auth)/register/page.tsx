"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Loader2, ArrowRight, Sparkles, Briefcase, ShieldCheck, Building2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/auth-context";
import { Input, Label, Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const schema = z.object({
  first_name: z.string().trim().min(1, "Required").max(50),
  last_name: z.string().trim().min(1, "Required").max(50),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Min 8 characters").max(72),
  confirm: z.string(),
  role: z.enum(["PROCUREMENT_OFFICER", "MANAGER", "VENDOR"]),
}).refine(v => v.password === v.confirm, { path: ["confirm"], message: "Passwords do not match" });
type Values = z.infer<typeof schema>;

const ROLES = [
  { value: "PROCUREMENT_OFFICER" as const, label: "Procurement", desc: "Manage vendors & RFQs", icon: Briefcase },
  { value: "MANAGER"             as const, label: "Manager",     desc: "Approve & report",     icon: ShieldCheck },
  { value: "VENDOR"              as const, label: "Vendor",      desc: "Submit quotations",    icon: Building2 },
];

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const { register: doRegister } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema), defaultValues: { role: "PROCUREMENT_OFFICER" },
  });
  const role = watch("role");

  const onSubmit = async (v: Values) => {
    try {
      await doRegister({ first_name: v.first_name, last_name: v.last_name, email: v.email, password: v.password, role: v.role });
      toast.success("Account created");
      router.replace("/dashboard");
    } catch (e: any) {
      const data = e?.response?.data;
      const msg = typeof data === "string" ? data : data ? Object.values(data).flat().join(" ") : "Registration failed";
      toast.error(msg);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-80" />
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-white/15 border border-white/30 grid place-items-center"><Sparkles className="h-5 w-5" /></div>
          <span className="text-xl font-bold tracking-tight">VendorBridge</span>
        </div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight">Join the next generation of procurement teams.</h1>
          <p className="mt-5 text-lg text-white/75 max-w-md">Onboard in under a minute. Pick your role and start collaborating today.</p>
        </div>
        <div className="text-sm text-white/60 relative z-10">Phase 1 — Foundation, auth and dashboard shell.</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="glass rounded-2xl shadow-elegant p-8 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
            <p className="text-sm text-muted-foreground mt-1">VendorBridge in under a minute.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>First name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9 h-11" {...register("first_name")} />
                  </div>
                  {errors.first_name && <p className="text-xs text-destructive">{errors.first_name.message}</p>}
                </div>
                <div className="space-y-1.5"><Label>Last name</Label>
                  <Input className="h-11" {...register("last_name")} />
                  {errors.last_name && <p className="text-xs text-destructive">{errors.last_name.message}</p>}
                </div>
              </div>
              <div className="space-y-1.5"><Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9 h-11" {...register("email")} />
                </div>
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5"><Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9 pr-10 h-11" type={showPw ? "text" : "password"} {...register("password")} />
                  <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
              </div>
              <div className="space-y-1.5"><Label>Confirm password</Label>
                <Input className="h-11" type={showPw ? "text" : "password"} {...register("confirm")} />
                {errors.confirm && <p className="text-xs text-destructive">{errors.confirm.message}</p>}
              </div>
              <div>
                <Label>Choose your role</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {ROLES.map(r => {
                    const active = role === r.value;
                    const I = r.icon;
                    return (
                      <button type="button" key={r.value} onClick={() => setValue("role", r.value, { shouldValidate: true })}
                        className={cn("p-3 rounded-lg border-2 text-left transition",
                          active ? "border-primary bg-primary/5 shadow-card" : "border-border hover:border-primary/40")}>
                        <I className={cn("h-4 w-4 mb-1.5", active ? "text-primary" : "text-muted-foreground")} />
                        <div className="text-xs font-semibold">{r.label}</div>
                        <div className="text-[10px] text-muted-foreground mt-0.5">{r.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <Button type="submit" variant="gradient" disabled={isSubmitting} className="w-full h-11 text-base">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Create account <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">Have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
