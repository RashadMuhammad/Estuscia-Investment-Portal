/**
 * Shared Type Definitions for Estuscia Investment Portal
 */

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  investmentAmount: number;
  notes?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'approved';
}

export interface ROIResult {
  principal: number;
  profitShareRate: number; // e.g. 0.50 for 50%
  profitEarned: number;
  totalPayback: number;
  termDays: number;
}
