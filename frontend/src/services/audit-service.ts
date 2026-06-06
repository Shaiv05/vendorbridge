import { api } from "./api";

export interface AuditLog {
  id: number;
  user_email: string;
  action: string;
  entity_type: string;
  entity_id: number;
  timestamp: string;
}

export const auditService = {
  getAll: () => api.get<AuditLog[]>("/audit-logs/"),
};
