export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  lastLogin?: Date;
}

export type UserRole = 'superadmin' | 'admin' | 'cashier' | 'customer' | 'debt_collection' | 'customer_service';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  meterNumber: string;
  connectionDate: Date;
  status: 'active' | 'inactive' | 'suspended';
  balance: number;
  lastReading: number;
  previousReading: number;
}

export interface Bill {
  id: string;
  customerId: string;
  customerName: string;
  billNumber: string;
  meterReading: number;
  previousReading: number;
  consumption: number;
  ratePerUnit: number;
  amount: number;
  dueDate: Date;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  createdAt: Date;
}

export interface Payment {
  id: string;
  billId: string;
  customerId: string;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'transfer' | 'mobile';
  paymentDate: Date;
  collectedBy: string;
  status: 'completed' | 'failed' | 'pending';
}

export interface DebtRecord {
  id: string;
  customerId: string;
  customerName: string;
  totalDebt: number;
  overdueDays: number;
  lastContactDate?: Date;
  status: 'active' | 'in_collection' | 'resolved';
  notes?: string;
}