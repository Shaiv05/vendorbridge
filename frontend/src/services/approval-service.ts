import { api } from "./api";

export interface Approval {
  id: number;
  rfq?: number;
  quotation?: number;
  approver: number;
  approver_email: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  comments: string;
  target_name: string;
  created_at: string;
  updated_at: string;
}

export const approvalService = {
  getAll: () => api.get<Approval[]>("/approvals/"),
  getById: (id: number) => api.get<Approval>(`/approvals/${id}/`),
  update: (id: number, data: Partial<Approval>) => api.patch<Approval>(`/approvals/${id}/`, data),
  approve: (id: number, comments: string) => api.patch<Approval>(`/approvals/${id}/`, { status: "APPROVED", comments }),
  reject: (id: number, comments: string) => api.patch<Approval>(`/approvals/${id}/`, { status: "REJECTED", comments }),
};
