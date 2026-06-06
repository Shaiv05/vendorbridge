"use client";
import { Quote } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
export default function Page() {
  return <Placeholder title="Quotations" description="Review and compare vendor quotations." icon={<Quote className="h-7 w-7" />} />;
}
