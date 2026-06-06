"use client";
import { CheckSquare } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
export default function Page() {
  return <Placeholder title="Approvals" description="Approve requisitions, POs and contracts." icon={<CheckSquare className="h-7 w-7" />} />;
}
