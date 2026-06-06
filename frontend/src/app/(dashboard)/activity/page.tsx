"use client";

import { useEffect, useState, Suspense } from "react";
import { Activity, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { auditService, type AuditLog } from "@/services/audit-service";
import { Card } from "@/components/ui/primitives";

function ActivityContent() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auditService.getAll()
      .then(r => setLogs(r.data))
      .catch(() => toast.error("Failed to load logs"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Audit Trail</h1>
      <Card className="p-6 bg-white/50 backdrop-blur-sm border-white/20">
        {loading ? <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div> : (
          <div className="space-y-4">
            {logs.map(log => (
              <div key={log.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg text-sm">
                <div><span className="font-bold">{log.user_email}</span> {log.action}</div>
                <div className="text-muted-foreground text-xs">{new Date(log.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export default function ActivityPage() {
  return (
    <Suspense fallback={<div className="py-20 flex justify-center"><Loader2 className="animate-spin text-primary" /></div>}>
      <ActivityContent />
    </Suspense>
  );
}
