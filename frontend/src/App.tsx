import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { Users } from '@/pages/Users';
import { Customers } from '@/pages/Customers';
import { Bills } from '@/pages/Bills';
import { Payments } from '@/pages/Payments';
import { Debts } from '@/pages/Debts';
import { Cashier } from '@/pages/Cashier';
import { CustomerService } from '@/pages/CustomerService';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="/cashier" element={<Cashier />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/reports" element={<Dashboard />} />
            <Route path="/settings" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;