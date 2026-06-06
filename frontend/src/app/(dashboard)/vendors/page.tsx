"use client";
import { Users } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
export default function Page() {
  return <Placeholder title="Vendors" description="Manage your supplier directory." icon={<Users className="h-7 w-7" />} cta="Add Vendor" />;
}
