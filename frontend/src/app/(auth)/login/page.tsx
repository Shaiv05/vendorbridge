"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, Loader2, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/auth-context";
import { Input, Label, Button } from "@/components/ui/primitives";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: Values) => {
    try { await login(v.email, v.password); toast.success("Welcome back"); router.replace("/dashboard"); }
    catch (e: any) { toast.error(e?.response?.data?.detail || "Invalid credentials"); }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col justify-between p-12 text-white bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-80" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl animate-float" />
        <div className="relative z-10 flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-white/15 border border-white/30 grid place-items-center"><Sparkles className="h-5 w-5" /></div>
          <span className="text-xl font-bold tracking-tight">VendorBridge</span>
        </div>
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-5xl xl:text-6xl font-bold leading-[1.05] tracking-tight">Streamline Procurement.<br />
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">Empower Decisions.</span></h1>
            <p className="mt-5 text-lg text-white/75 max-w-md">The modern ERP that unifies vendors, quotations, approvals and invoices.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            {["Vendor Management","RFQ Automation","Approval Workflows","Invoice Generation"].map(f =>
              <div key={f} className="flex items-center gap-2 text-sm font-medium text-white/90"><CheckCircle2 className="h-4 w-4" />{f}</div>)}
          </div>
        </div>
        <div className="relative z-10 text-sm text-white/60">Trusted by procurement teams worldwide</div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="glass rounded-2xl shadow-elegant p-8 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your VendorBridge workspace.</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <div className="space-y-1.5"><Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9 h-11" placeholder="you@company.com" {...register("email")} />
                </div>
                {errors.email && <p className="text-xs text-destructive font-medium">{errors.email.message}</p>}
              </div>
              <div className="space-y-1.5"><Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9 pr-10 h-11" type={showPw ? "text" : "password"} placeholder="••••••••" {...register("password")} />
                  <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-xs text-destructive font-medium">{errors.password.message}</p>}
              </div>
              <Button type="submit" variant="gradient" disabled={isSubmitting} className="w-full h-11 text-base">
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">No account? <Link href="/register" className="text-primary font-semibold hover:underline">Create one</Link></p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
