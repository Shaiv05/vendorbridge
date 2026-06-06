"use client";

import { useEffect, useState, Suspense } from "react";
import { FileText, Plus, Search, Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import type { RFQ } from "@/types/rfq";
import { rfqService } from "@/services/rfq-service";
import { Button, Input, Card } from "@/components/ui/primitives";
import { RFQTable } from "./rfq-table";
import { RFQForm } from "./rfq-form";
import { useAuth } from "@/features/auth/auth-context";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function RFQsContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const q = searchParams.get("q") || "";

  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<RFQ | null>(null);

  const canEdit = user?.role === "ADMIN" || user?.role === "PROCUREMENT_OFFICER";

  const fetchRfqs = async () => {
    try {
      setLoading(true);
      const { data } = await rfqService.getAll();
      setRfqs(data);
    } catch (e) {
      toast.error("Failed to load RFQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRfqs(); }, []);

  const filtered = rfqs.filter(r => 
    r.title.toLowerCase().includes(q.toLowerCase()) ||
    r.vendor_name?.toLowerCase().includes(q.toLowerCase())
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
        await rfqService.update(editing.id, values);
        toast.success("RFQ updated successfully");
      } else {
        await rfqService.create(values);
        toast.success("RFQ created successfully");
      }
      setShowForm(false);
      setEditing(null);
      fetchRfqs();
    } catch (e: any) {
      toast.error(e?.response?.data?.detail || "An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this RFQ?")) return;
    try {
      await rfqService.delete(id);
      toast.success("RFQ deleted");
      fetchRfqs();
    } catch (e) {
      toast.error("Failed to delete RFQ");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">RFQ Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Issue and track requests for quotation from vendors.</p>
        </div>
        {canEdit && (
          <Button variant="gradient" onClick={() => { setEditing(null); setShowForm(true); }}>
            <Plus className="h-4 w-4" /> Create RFQ
          </Button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search by title or vendor..." 
            value={q} 
            onChange={(e) => updateSearch(e.target.value)} 
          />
        </div>
        <Button variant="outline" size="icon" onClick={fetchRfqs} disabled={loading}>
          <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
        </Button>
      </div>

      <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-white/20">
        {loading && rfqs.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground font-medium">Loading RFQs...</p>
          </div>
        ) : (
          <RFQTable 
            rfqs={filtered} 
            onEdit={(r) => { if (canEdit) { setEditing(r); setShowForm(true); } else { toast.error("Permission denied"); } }} 
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
                <h3 className="font-bold text-lg">{editing ? "Edit RFQ" : "Create New RFQ"}</h3>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-full transition">
                  <Plus className="h-5 w-5 rotate-45" />
                </button>
              </div>
              <div className="p-6">
                <RFQForm initialData={editing} onSubmit={handleSubmit} onCancel={() => setShowForm(false)} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RFQsPage() {
  return (
    <Suspense fallback={<div className="py-20 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <RFQsContent />
    </Suspense>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
