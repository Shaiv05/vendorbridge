"use client";
import { Receipt } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
export default function Page() {
  return <Placeholder title="Invoices" description="Generate, send and reconcile invoices." icon={<Receipt className="h-7 w-7" />} />;
}
