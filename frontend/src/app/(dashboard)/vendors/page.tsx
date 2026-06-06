"use client";

import { useEffect, useState, Suspense } from "react";
import { Users, Plus, Search, Filter, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import type { Vendor } from "@/types/vendor";
import { vendorService } from "@/services/vendor-service";
import { Button, Input, Card } from "@/components/ui/primitives";
import { VendorTable } from "./vendor-table";
import { VendorForm } from "./vendor-form";
import { useAuth } from "@/features/auth/auth-context";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function VendorsContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = searchParams.get("q") || "";

  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Vendor | null>(null);

  const canEdit = user?.role === "ADMIN" || user?.role === "PROCUREMENT_OFFICER";

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const { data } = await vendorService.getAll();
      setVendors(data);
    } catch (e) {
      toast.error("Failed to load vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVendors(); }, []);

  const filtered = vendors.filter(v => 
    v.vendor_name.toLowerCase().includes(q.toLowerCase()) ||
    v.email.toLowerCase().includes(q.toLowerCase()) ||
    v.category.toLowerCase().includes(q.toLowerCase())
  );

  const updateSearch = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set("q", val);
    else params.delete("q");
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editing) {
        await vendorService.update(editing.id, values);
        toast.success("Vendor updated successfully");
      } else {
        await vendorService.create(values);
        toast.success("Vendor added successfully");
      }
      setShowForm(false);
      setEditing(null);
      fetchVendors();
    } catch (e: any) {
      toast.error(e?.response?.data?.detail || "An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this vendor?")) return;
    try {
      await vendorService.delete(id);
      toast.success("Vendor deleted");
      fetchVendors();
    } catch (e) {
      toast.error("Failed to delete vendor");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendor Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your supplier directory and categories.</p>
        </div>
        {canEdit && (
          <Button variant="gradient" onClick={() => { setEditing(null); setShowForm(true); }}>
            <Plus className="h-4 w-4" /> Add Vendor
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search by name, email or category..." 
            value={q} 
            onChange={(e) => updateSearch(e.target.value)} 
          />
        </div>
        <Button variant="outline" size="icon" onClick={fetchVendors} disabled={loading}>
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
        </Button>
      </div>

      <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-white/20">
        {loading && vendors.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">Loading your vendors...</p>
          </div>
        ) : (
          <VendorTable 
            vendors={filtered} 
            onEdit={(v) => { if (canEdit) { setEditing(v); setShowForm(true); } else { toast.error("Permission denied"); } }} 
            onDelete={(id) => { if (canEdit) handleDelete(id); else toast.error("Permission denied"); }} 
          />
        )}
      </Card>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-background rounded-2xl shadow-elegant overflow-hidden border border-border">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
                <h3 className="font-bold text-lg">{editing ? "Edit Vendor" : "Add New Vendor"}</h3>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-full transition">
                  <Plus className="h-5 w-5 rotate-45" />
                </button>
              </div>
              <div className="p-6">
                <VendorForm initialData={editing} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function VendorsPage() {
  return (
    <Suspense fallback={<div className="py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <VendorsContent />
    </Suspense>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
