"use client";

import { useEffect, useState, Suspense } from "react";
import { ShoppingCart, Plus, Search, Loader2, RefreshCw, Download } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import type { PurchaseOrder } from "@/services/po-service";
import { poService } from "@/services/po-service";
import { Button, Input, Card } from "@/components/ui/primitives";
import { useAuth } from "@/features/auth/auth-context";
import { cn } from "@/lib/utils";

function POsContent() {
  const { user } = useAuth();
  const [pos, setPos] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPos = async () => {
    try {
      setLoading(true);
      const { data } = await poService.getAll();
      setPos(data);
    } catch (e) {
      toast.error("Failed to load POs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPos(); }, []);

  const downloadPdf = async (id: number, poNumber: string) => {
    try {
      const response = await poService.downloadPdf(id);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `PO_${poNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      toast.error("Failed to download PDF");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Purchase Orders</h1>
      </div>

      <Card className="overflow-hidden bg-white/50 backdrop-blur-sm border-white/20">
        {loading ? (
          <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">PO #</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendor</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Amount</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pos.map(po => (
                  <tr key={po.id} className="border-b border-border hover:bg-muted/30">
                    <td className="px-4 py-4 font-mono text-sm">{po.po_number}</td>
                    <td className="px-4 py-4 text-sm">{po.vendor_name}</td>
                    <td className="px-4 py-4 text-sm font-bold text-primary">${parseFloat(po.amount).toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm">{po.status}</td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => downloadPdf(po.id, po.po_number)}><Download className="h-4 w-4 mr-1" /> PDF</Button>
                    </td>
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

export default function POsPage() {
  return (
    <Suspense fallback={<div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
      <POsContent />
    </Suspense>
  );
}
