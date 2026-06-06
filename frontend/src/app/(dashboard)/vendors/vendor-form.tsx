"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save, X } from "lucide-react";
import type { Vendor, VendorStatus } from "@/types/vendor";
import { Input, Label, Button } from "@/components/ui/primitives";

const schema = z.object({
  vendor_name: z.string().trim().min(1, "Required").max(255),
  category: z.string().trim().min(1, "Required").max(100),
  gst_number: z.string().trim().min(15, "Exact 15 chars").max(15, "Exact 15 chars"),
  email: z.string().trim().email("Invalid email"),
  phone: z.string().trim().min(1, "Required"),
  address: z.string().trim().min(1, "Required"),
  status: z.enum(["ACTIVE", "INACTIVE", "BLACKLISTED"]),
});

type Values = z.infer<typeof schema>;

interface Props {
  initialData?: Vendor | null;
  onSubmit: (data: Values) => Promise<void>;
  onCancel: () => void;
}

export function VendorForm({ initialData, onSubmit, onCancel }: Props) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { status: "ACTIVE" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Vendor Name</Label>
          <Input {...register("vendor_name")} placeholder="e.g. Acme Corp" />
          {errors.vendor_name && <p className="text-xs text-destructive">{errors.vendor_name.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Category</Label>
          <Input {...register("category")} placeholder="e.g. IT Services" />
          {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>GST Number</Label>
          <Input {...register("gst_number")} placeholder="15-digit GSTIN" />
          {errors.gst_number && <p className="text-xs text-destructive">{errors.gst_number.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Status</Label>
          <select {...register("status")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="BLACKLISTED">Blacklisted</option>
          </select>
          {errors.status && <p className="text-xs text-destructive">{errors.status.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label>Email</Label>
          <Input {...register("email")} type="email" placeholder="contact@vendor.com" />
          {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
        </div>
        <div className="space-y-1.5">
          <Label>Phone</Label>
          <Input {...register("phone")} placeholder="+1 (555) 000-0000" />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Address</Label>
        <textarea {...register("address")} rows={3} className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" placeholder="Full business address..." />
        {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="gradient" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4" /> Save Vendor</>}
        </Button>
      </div>
    </form>
  );
}
