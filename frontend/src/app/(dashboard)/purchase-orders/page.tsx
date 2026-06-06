"use client";
import { ShoppingCart } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
export default function Page() {
  return <Placeholder title="Purchase Orders" description="Track POs across vendors and projects." icon={<ShoppingCart className="h-7 w-7" />} cta="New PO" />;
}
