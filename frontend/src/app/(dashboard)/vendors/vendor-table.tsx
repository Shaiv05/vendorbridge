"use client";

import { Edit2, Trash2, Mail, Phone, MapPin } from "lucide-react";
import type { Vendor } from "@/types/vendor";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/primitives";

interface Props {
  vendors: Vendor[];
  onEdit: (vendor: Vendor) => void;
  onDelete: (id: number) => void;
}

export function VendorTable({ vendors, onEdit, onDelete }: Props) {
  if (vendors.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto h-12 w-12 rounded-xl bg-muted grid place-items-center mb-4">
          <Mail className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">No vendors found</h3>
        <p className="text-muted-foreground text-sm">Try adjusting your search or add a new vendor.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendor Details</th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">GST Number</th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
            <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {vendors.map((v) => (
            <tr key={v.id} className="group hover:bg-muted/30 transition-colors">
              <td className="px-4 py-4">
                <div className="font-semibold text-sm">{v.vendor_name}</div>
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Mail className="h-3 w-3" /> {v.email}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Phone className="h-3 w-3" /> {v.phone}
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm font-medium">{v.category}</td>
              <td className="px-4 py-4 text-sm font-mono text-muted-foreground">{v.gst_number}</td>
              <td className="px-4 py-4">
                <StatusBadge status={v.status} />
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onEdit(v)} className="h-8 w-8 p-0">
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDelete(v.id)} className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10">
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
