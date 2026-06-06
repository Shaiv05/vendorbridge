"use client";
import { FileText } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
export default function Page() {
  return <Placeholder title="RFQs" description="Issue & track requests for quotation." icon={<FileText className="h-7 w-7" />} cta="Create RFQ" />;
}
