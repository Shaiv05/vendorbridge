"use client";

import { Edit2, Trash2, Calendar, FileText, User, BarChart3 } from "lucide-react";
import Link from "next/link";
import type { RFQ } from "@/types/rfq";
import { RFQ_STATUS_LABEL } from "@/types/rfq";
import { Button } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

interface Props {
  rfqs: RFQ[];
  onEdit: (rfq: RFQ) => void;
  onDelete: (id: number) => void;
}

export function RFQTable({ rfqs, onEdit, onDelete }: Props) {
  if (rfqs.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto h-12 w-12 rounded-xl bg-muted grid place-items-center mb-4">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No RFQs found</h3>
        <p className="text-muted-foreground text-sm">Create your first request for quotation.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">RFQ Details</th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendor</th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deadline</th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rfqs.map((r) => (
            <tr key={r.id} className="group hover:bg-muted/30 transition-colors">
              <td className="px-4 py-4">
                <div className="font-semibold text-sm">{r.title}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 max-w-[200px]">{r.description}</div>
                <div className="text-[10px] font-bold text-primary mt-1 uppercase tracking-tight">Qty: {r.quantity}</div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-muted grid place-items-center"><User className="h-3 w-3" /></div>
                  <span className="text-sm font-medium">{r.vendor_name || "Unassigned"}</span>
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(r.deadline).toLocaleDateString()}
                </div>
              </td>
              <td className="px-4 py-4">
                <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                  r.status === "SENT" ? "bg-success/10 text-success" : "bg-warning/10 text-warning")}>
                  {RFQ_STATUS_LABEL[r.status]}
                </span>
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/rfqs/${r.id}/compare`}>
                    <Button variant="ghost" size="sm" className="h-8 gap-1.5 text-xs text-primary font-bold hover:bg-primary/10">
                      <BarChart3 className="h-3.5 w-3.5" /> Compare
                    </Button>
                  </Link>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(r)} className="h-8 w-8 p-0">
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(r.id)} className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
