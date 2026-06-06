"use client";

import { useEffect, useState } from "react";
import { CheckSquare, Loader2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { approvalService, type Approval } from "@/services/approval-service";
import { Button, Card } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const { data } = await approvalService.getAll();
      setApprovals(data);
    } catch (e) {
      toast.error("Failed to load approvals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchApprovals(); }, []);

  const handleDecision = async (id: number, status: "APPROVED" | "REJECTED") => {
    try {
      if (status === "APPROVED") await approvalService.approve(id, "Approved via portal");
      else await approvalService.reject(id, "Rejected via portal");
      toast.success(`Approval ${status.toLowerCase()}ed`);
      fetchApprovals();
    } catch (e) {
      toast.error("Decision failed");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Pending Approvals</h1>
      <Card className="p-6 bg-white/50 backdrop-blur-sm border-white/20">
        {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" /></div>
        ) : approvals.filter(a => a.status === "PENDING").length === 0 ? (
          <p className="text-center text-muted-foreground py-10">No pending approvals.</p>
        ) : (
          <div className="space-y-4">
            {approvals.filter(a => a.status === "PENDING").map(a => (
              <div key={a.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div>
                  <div className="font-semibold">{a.target_name}</div>
                  <div className="text-xs text-muted-foreground">Requested by {a.approver_email}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleDecision(a.id, "REJECTED")} className="text-destructive"><XCircle className="h-4 w-4 mr-1" /> Reject</Button>
                  <Button variant="gradient" size="sm" onClick={() => handleDecision(a.id, "APPROVED")}><CheckCircle2 className="h-4 w-4 mr-1" /> Approve</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
