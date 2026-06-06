"use client";

import { useEffect, useState, Suspense } from "react";
import { Receipt, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { Invoice } from "@/services/invoice-service";
import { invoiceService } from "@/services/invoice-service";
import { Card } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

function InvoicesContent() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const { data } = await invoiceService.getAll();
      setInvoices(data);
    } catch (e) {
      toast.error("Failed to load invoices");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Invoice Management</h1>
      </div>

      <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-white/20">
        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Invoice #</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">PO #</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendor</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id} className="border-b border-border hover:bg-muted/30">
                    <td className="px-4 py-4 font-mono text-sm">{inv.invoice_number}</td>
                    <td className="px-4 py-4 font-mono text-sm">{inv.po_number}</td>
                    <td className="px-4 py-4 text-sm">{inv.vendor_name}</td>
                    <td className="px-4 py-4 text-sm font-bold text-primary">${parseFloat(inv.amount).toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm">{inv.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function InvoicesPage() {
  return (
    <Suspense fallback={<div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
      <InvoicesContent />
    </Suspense>
  );
}
