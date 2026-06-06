"use client";

import { useEffect, useState } from "react";
import { Quote, Plus, Search, Loader2, RefreshCw, Send, FileText } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import type { Quotation } from "@/types/quotation";
import type { RFQ } from "@/types/rfq";
import { quotationService } from "@/services/quotation-service";
import { rfqService } from "@/services/rfq-service";
import { Button, Input, Card } from "@/components/ui/primitives";
import { useAuth } from "@/features/auth/auth-context";
import { cn } from "@/lib/utils";

export default function QuotationsPage() {
  const { user } = useAuth();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  const [formData, setFormData] = useState({
    rfq: "",
    price: "",
    delivery_days: "",
    notes: ""
  });

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const { data } = await quotationService.getAll();
      setQuotations(data);
    } catch (e) {
      toast.error("Failed to load quotations");
    } finally {
      setLoading(false);
    }
  };

  const fetchRfqs = async () => {
    try {
      const { data } = await rfqService.getAll();
      setRfqs(data);
    } catch (e) {}
  };

  useEffect(() => { 
    fetchQuotations(); 
    if (user?.role === "VENDOR") fetchRfqs();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.rfq || !formData.price || !formData.delivery_days) {
      return toast.error("Please fill in all required fields");
    }

    try {
      // Find the vendor associated with the user. In a real app, 
      // the backend would derive this from the token.
      // For this demo, we'll assume there's a vendor with ID 1.
      await quotationService.create({
        rfq: parseInt(formData.rfq),
        vendor: 1, 
        price: formData.price,
        delivery_days: parseInt(formData.delivery_days),
        notes: formData.notes,
        status: "SUBMITTED"
      });
      toast.success("Quotation submitted successfully");
      setShowForm(false);
      setFormData({ rfq: "", price: "", delivery_days: "", notes: "" });
      fetchQuotations();
    } catch (e: any) {
      toast.error(e?.response?.data?.non_field_errors?.[0] || "Already submitted or invalid data");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quotation Management</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {user?.role === "VENDOR" ? "Track your submitted proposals and bid on new RFQs." : "Review all vendor quotations."}
          </p>
        </div>
        {user?.role === "VENDOR" && (
          <Button variant="gradient" onClick={() => setShowForm(true)}>
            <Send className="h-4 w-4" /> Submit Quote
          </Button>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-white/20">
            {loading ? (
              <div className="py-20 flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground font-medium">Loading quotations...</p>
              </div>
            ) : quotations.length === 0 ? (
              <div className="py-20 text-center">
                <div className="mx-auto h-12 w-12 rounded-xl bg-muted grid place-items-center mb-4">
                  <Quote className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold">No quotations yet</h3>
                <p className="text-muted-foreground text-sm">When you bid on RFQs, they will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border text-left">
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">RFQ / Project</th>
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Delivery</th>
                      <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {quotations.map((q) => (
                      <tr key={q.id} className="group hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-4 text-sm font-semibold">{q.rfq_title}</td>
                        <td className="px-4 py-4 text-sm font-bold text-primary">${parseFloat(q.price).toLocaleString()}</td>
                        <td className="px-4 py-4 text-sm text-muted-foreground">{q.delivery_days} days</td>
                        <td className="px-4 py-4 text-right">
                           <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                              q.status === "SUBMITTED" ? "bg-primary/10 text-primary" : 
                              q.status === "ACCEPTED" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground")}>
                            {q.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="p-6 bg-violet/5 border-violet/10">
            <h3 className="font-bold flex items-center gap-2"><Sparkles className="h-4 w-4 text-violet" /> Vendor Insights</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Submitting detailed notes and competitive delivery timelines increases your chances of being awarded a contract.
            </p>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-background rounded-2xl shadow-elegant overflow-hidden border border-border">
              <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-muted/30">
                <h3 className="font-bold text-lg text-primary">Submit Quotation</h3>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-muted rounded-full transition">
                  <Plus className="h-5 w-5 rotate-45" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Select RFQ</label>
                  <select value={formData.rfq} onChange={(e) => setFormData({...formData, rfq: e.target.value})} 
                    className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm">
                    <option value="">Choose an open request...</option>
                    {rfqs.map(r => <option key={r.id} value={r.id}>{r.title} (Qty: {r.quantity})</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Unit Price ($)</label>
                    <Input className="h-11 rounded-xl" type="number" step="0.01" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0.00" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Delivery (Days)</label>
                    <Input className="h-11 rounded-xl" type="number" value={formData.delivery_days} onChange={(e) => setFormData({...formData, delivery_days: e.target.value})} placeholder="e.g. 15" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Additional Notes</label>
                  <textarea rows={3} value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="flex w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm" placeholder="Any specifics about your quote..." />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                  <Button type="submit" variant="gradient" className="px-8 shadow-glow">
                    <Send className="h-4 w-4" /> Submit Proposal
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
