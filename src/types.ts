/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppFlavor = 'green' | 'blue' | null;

export interface ChatMessage {
  id: string;
  sender: 'user' | 'billy';
  text: string;
  timestamp: string;
}

export interface SmartAlert {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'info' | 'success';
  time: string;
  active: boolean;
}

export interface DayMission {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
}

export interface ExternalInputVars {
  marketTrend: number;
  politicalEvent: string;
  inflationValue: number;
  globalIndices: 'bull' | 'bear' | 'flat';
}

export interface ExpenseItem {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  paidBy: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  balance: number;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  items: InvoiceItem[];
  date: string;
  dueDate: string;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
}

export interface BusinessMetric {
  month: string;
  revenue: number;
  expenses: number;
  clients: number;
}
