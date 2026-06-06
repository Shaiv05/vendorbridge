"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "@/services/api";
import { Card } from "@/components/ui/primitives";
import { Receipt, FileText, CheckCircle2, Clock } from "lucide-react";

interface PO { id: number; po_number: string; vendor_name: string; amount: string; status: string; }
interface Invoice { id: number; invoice_number: string; amount: string; status: string; }

export default function AnalyticsPage() {
  const [data, setData] = useState({ pos: [] as PO[], invoices: [] as Invoice[] });
  
  useEffect(() => {
    Promise.all([api.get("/purchase-orders/"), api.get("/invoices/")])
      .then(([poRes, invRes]) => setData({ pos: poRes.data, invoices: invRes.data }))
      .catch(() => toast.error("Failed to load analytics"));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Procurement Analytics</h1>
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-6">
          <h3 className="font-bold">Total PO Value</h3>
          <p className="text-3xl font-black text-primary">${data.pos.reduce((sum, po) => sum + parseFloat(po.amount), 0).toLocaleString()}</p>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold">Pending Invoices</h3>
          <p className="text-3xl font-black text-warning">{data.invoices.filter(i => i.status === "PENDING").length}</p>
        </Card>
      </div>
    </div>
  );
}
