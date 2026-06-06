"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, Send } from "lucide-react";
import type { RFQ } from "@/types/rfq";
import type { Vendor } from "@/types/vendor";
import { vendorService } from "@/services/vendor-service";
import { Input, Label, Button } from "@/components/ui/primitives";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().trim().min(1, "Required").max(255),
  description: z.string().trim().min(1, "Required"),
  quantity: z.string().min(1, "Required"),
  deadline: z.string().min(1, "Required"),
  vendor: z.coerce.number().min(1, "Please select a vendor"),
  status: z.enum(["DRAFT", "SENT"]),
});

type Values = z.infer<typeof schema>;

interface Props {
  initialData?: RFQ | null;
  onSubmit: (data: Values) => Promise<void>;
  onCancel: () => void;
}

export function RFQForm({ initialData, onSubmit, onCancel }: Props) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loadingVendors, setLoadingVendors] = useState(true);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: initialData ? {
      ...initialData,
      deadline: new Date(initialData.deadline).toISOString().split("T")[0],
    } : { status: "DRAFT" } as any,
  });

  useEffect(() => {
    vendorService.getAll()
      .then(r => setVendors(r.data))
      .catch(() => toast.error("Failed to load vendors"))
      .finally(() => setLoadingVendors(false));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1.5">
        <Label>RFQ Title</Label>
        <Input {...register("title")} placeholder="e.g. Purchase of 50 Laptops" />
        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label>Description</Label>
        <textarea {...register("description")} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Detailed requirements..." />
        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Quantity</Label>
          <Input {...register("quantity")} type="number" step="0.01" placeholder="0.00" />
          {errors.quantity && <p className="text-xs text-destructive">{errors.quantity.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Deadline</Label>
          <Input {...register("deadline")} type="date" />
          {errors.deadline && <p className="text-xs text-destructive">{errors.deadline.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Assign Vendor</Label>
          <select {...register("vendor")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" disabled={loadingVendors}>
            <option value="">Select a vendor</option>
            {vendors.map(v => (
              <option key={v.id} value={v.id}>{v.vendor_name}</option>
            ))}
          </select>
          {errors.vendor && <p className="text-xs text-destructive">{errors.vendor.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Status</Label>
          <select {...register("status")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
          </select>
          {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="gradient" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : (
            <>
              {initialData ? <Save className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              {initialData ? "Update RFQ" : "Create & Send"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
