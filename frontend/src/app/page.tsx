"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/auth-context";

export default function Index() {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => { if (!loading) router.replace(user ? "/dashboard" : "/login"); }, [user, loading, router]);
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-hero">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
    </div>
  );
}
