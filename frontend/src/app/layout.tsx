import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/features/auth/auth-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "VendorBridge — Procurement & Vendor Management ERP",
  description: "Streamline procurement. Empower decisions. Modern ERP for vendors, RFQs, approvals and invoices.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body><AuthProvider>{children}<Toaster richColors position="top-right" /></AuthProvider></body>
    </html>
  );
}
