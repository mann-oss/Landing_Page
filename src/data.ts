/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Friend, ExpenseItem, Invoice, BusinessMetric } from './types';

export const GREEN_FRIENDS: Friend[] = [
  { id: '1', name: 'Alex Rivera', avatar: 'AR', balance: 45.50 },
  { id: '2', name: 'Chloe Chen', avatar: 'CC', balance: -12.80 },
  { id: '3', name: 'Justin Taylor', avatar: 'JT', balance: 85.00 },
  { id: '4', name: 'Samantha Wu', avatar: 'SW', balance: 0.00 }
];

export const GREEN_EXPENSES: ExpenseItem[] = [
  {
    id: 'e1',
    description: 'Friday Pizza Night',
    amount: 64.00,
    category: 'Food',
    date: '2026-07-10',
    paidBy: 'You'
  },
  {
    id: 'e2',
    description: 'Uber Ride Home',
    amount: 18.50,
    category: 'Transport',
    date: '2026-07-09',
    paidBy: 'Chloe Chen'
  },
  {
    id: 'e3',
    description: 'Boardgame Cafe Entry',
    amount: 32.00,
    category: 'Entertainment',
    date: '2026-07-08',
    paidBy: 'You'
  }
];

export const BLUE_INVOICES: Invoice[] = [
  {
    id: 'INV-2026-001',
    clientName: 'Apex Tech Corp',
    clientEmail: 'billing@apextech.com',
    items: [
      { id: 'i1', description: 'Enterprise UI Redesign Phase 1', quantity: 1, rate: 4500.00 },
      { id: 'i2', description: 'Tailwind Consultant Support', quantity: 12, rate: 150.00 }
    ],
    date: '2026-07-01',
    dueDate: '2026-07-31',
    status: 'Sent'
  },
  {
    id: 'INV-2026-002',
    clientName: 'Bloom Health Inc',
    clientEmail: 'finance@bloomhealth.io',
    items: [
      { id: 'i3', description: 'Design System Architecture', quantity: 1, rate: 8000.00 }
    ],
    date: '2026-06-15',
    dueDate: '2026-07-15',
    status: 'Paid'
  },
  {
    id: 'INV-2026-003',
    clientName: 'Novus Retailers Ltd',
    clientEmail: 'ap@novusretail.com',
    items: [
      { id: 'i4', description: 'Custom Checkout Integration', quantity: 24, rate: 120.00 }
    ],
    date: '2026-06-05',
    dueDate: '2026-07-05',
    status: 'Overdue'
  }
];

export const BLUE_METRICS: BusinessMetric[] = [
  { month: 'Jan', revenue: 12400, expenses: 4500, clients: 3 },
  { month: 'Feb', revenue: 15800, expenses: 5100, clients: 4 },
  { month: 'Mar', revenue: 14200, expenses: 4800, clients: 4 },
  { month: 'Apr', revenue: 19500, expenses: 6200, clients: 5 },
  { month: 'May', revenue: 24000, expenses: 7800, clients: 6 },
  { month: 'Jun', revenue: 28900, expenses: 8400, clients: 7 }
];
