import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calculator, CreditCard, DollarSign, Receipt, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CashierTransaction {
  id: string;
  customerName: string;
  billNumber: string;
  amount: number;
  paymentMethod: 'cash' | 'card' | 'transfer';
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
}

export function Cashier() {
  const { hasRole } = useAuth();
  const { toast } = useToast();
  
  const [transactions, setTransactions] = useState<CashierTransaction[]>([
    {
      id: '1',
      customerName: 'Aliyev Vali',
      billNumber: 'BILL-2024-001',
      amount: 125000,
      paymentMethod: 'cash',
      status: 'completed',
      timestamp: new Date('2024-01-25T09:15:00'),
    },
    {
      id: '2',
      customerName: 'Karimova Gulnora',
      billNumber: 'BILL-2024-002',
      amount: 89500,
      paymentMethod: 'card',
      status: 'completed',
      timestamp: new Date('2024-01-25T10:30:00'),
    },
    {
      id: '3',
      customerName: 'Toshev Umar',
      billNumber: 'BILL-2024-003',
      amount: 156000,
      paymentMethod: 'cash',
      status: 'pending',
      timestamp: new Date('2024-01-25T11:45:00'),
    },
  ]);

  const [currentTransaction, setCurrentTransaction] = useState({
    customerName: '',
    billNumber: '',
    amount: 0,
    paymentMethod: 'cash' as const,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [cashDrawer, setCashDrawer] = useState({
    opening: 500000,
    current: 750000,
    totalCash: 625000,
    totalCard: 125000,
  });

  const handleProcessPayment = () => {
    if (!currentTransaction.customerName || !currentTransaction.billNumber || currentTransaction.amount <= 0) {
      toast({
        title: 'Xatolik',
        description: 'Barcha maydonlarni to\'ldiring',
        variant: 'destructive',
      });
      return;
    }

    const newTransaction: CashierTransaction = {
      id: Date.now().toString(),
      ...currentTransaction,
      status: 'completed',
      timestamp: new Date(),
    };

    setTransactions([newTransaction, ...transactions]);
    
    // Update cash drawer
    if (currentTransaction.paymentMethod === 'cash') {
      setCashDrawer(prev => ({
        ...prev,
        current: prev.current + currentTransaction.amount,
        totalCash: prev.totalCash + currentTransaction.amount,
      }));
    } else {
      setCashDrawer(prev => ({
        ...prev,
        totalCard: prev.totalCard + currentTransaction.amount,
      }));
    }

    toast({
      title: 'Muvaffaqiyat',
      description: 'To\'lov muvaffaqiyatli qabul qilindi',
    });

    // Reset form
    setCurrentTransaction({
      customerName: '',
      billNumber: '',
      amount: 0,
      paymentMethod: 'cash',
    });
  };

  const getStatusBadge = (status: CashierTransaction['status']) => {
    const statusConfig = {
      pending: { 
        label: 'Kutilayotgan', 
        className: 'bg-yellow-100 text-yellow-800',
        icon: <Clock className="w-3 h-3" />
      },
      completed: { 
        label: 'Bajarildi', 
        className: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="w-3 h-3" />
      },
      failed: { 
        label: 'Xatolik', 
        className: 'bg-red-100 text-red-800',
        icon: <AlertCircle className="w-3 h-3" />
      },
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={`${config.className} flex items-center space-x-1`}>
        {config.icon}
        <span>{config.label}</span>
      </Badge>
    );
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('uz-UZ') + ' so\'m';
  };

  const getTodayTotal = () => {
    const today = new Date().toDateString();
    return transactions
      .filter(t => t.timestamp.toDateString() === today && t.status === 'completed')
      .reduce((total, t) => total + t.amount, 0);
  };

  const getTodayCount = () => {
    const today = new Date().toDateString();
    return transactions.filter(t => t.timestamp.toDateString() === today && t.status === 'completed').length;
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!hasRole(['cashier'])) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">Sizda bu bo'limga kirish huquqi yo'q</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kassa</h1>
          <p className="text-gray-600 mt-1">To'lovlarni qabul qilish va kassa boshqaruvi</p>
        </div>
      </div>

      {/* Cash Drawer Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bugungi to'lovlar</p>
                <p className="text-2xl font-bold text-gray-900">{getTodayCount()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calculator className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bugungi summa</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatAmount(getTodayTotal())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Receipt className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Naqd pul</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatAmount(cashDrawer.totalCash)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Karta to'lovlari</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatAmount(cashDrawer.totalCard)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Processing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="w-5 h-5" />
              <span>Yangi to'lov</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customerName">Mijoz nomi</Label>
              <Input
                id="customerName"
                value={currentTransaction.customerName}
                onChange={(e) => setCurrentTransaction({ ...currentTransaction, customerName: e.target.value })}
                placeholder="Mijoz nomini kiriting"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billNumber">Hisob-kitob raqami</Label>
              <Input
                id="billNumber"
                value={currentTransaction.billNumber}
                onChange={(e) => setCurrentTransaction({ ...currentTransaction, billNumber: e.target.value })}
                placeholder="BILL-2024-001"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">To'lov summasi</Label>
              <Input
                id="amount"
                type="number"
                value={currentTransaction.amount || ''}
                onChange={(e) => setCurrentTransaction({ ...currentTransaction, amount: Number(e.target.value) })}
                placeholder="0"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentMethod">To'lov usuli</Label>
              <Select 
                value={currentTransaction.paymentMethod} 
                onValueChange={(value: 'cash' | 'card' | 'transfer') => 
                  setCurrentTransaction({ ...currentTransaction, paymentMethod: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Naqd pul</SelectItem>
                  <SelectItem value="card">Bank kartasi</SelectItem>
                  <SelectItem value="transfer">Bank o'tkazmasi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleProcessPayment}
                className="w-full bg-sky-500 hover:bg-sky-600"
                size="lg"
              >
                <Receipt className="w-4 h-4 mr-2" />
                To'lovni qabul qilish
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Tezkor amallar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Search className="w-6 h-6 mb-2" />
                <span className="text-sm">Hisob qidirish</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Receipt className="w-6 h-6 mb-2" />
                <span className="text-sm">Chek chop etish</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <Calculator className="w-6 h-6 mb-2" />
                <span className="text-sm">Kassa hisoboti</span>
              </Button>
              
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                <DollarSign className="w-6 h-6 mb-2" />
                <span className="text-sm">Kassa yopish</span>
              </Button>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-2">Kassa holati</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ochilish summasi:</span>
                  <span className="font-medium">{formatAmount(cashDrawer.opening)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Joriy summa:</span>
                  <span className="font-medium">{formatAmount(cashDrawer.current)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Bugungi foyda:</span>
                  <span className="font-medium text-green-600">
                    {formatAmount(cashDrawer.current - cashDrawer.opening)}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>So'nggi tranzaksiyalar</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vaqt</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Hisob raqami</TableHead>
                <TableHead>Summa</TableHead>
                <TableHead>To'lov usuli</TableHead>
                <TableHead>Holat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.slice(0, 10).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="text-sm">
                      <p>{transaction.timestamp.toLocaleTimeString('uz-UZ')}</p>
                      <p className="text-gray-600">{transaction.timestamp.toLocaleDateString('uz-UZ')}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{transaction.customerName}</TableCell>
                  <TableCell className="font-mono">{transaction.billNumber}</TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatAmount(transaction.amount)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {transaction.paymentMethod === 'cash' ? 'Naqd' : 
                       transaction.paymentMethod === 'card' ? 'Karta' : 'O\'tkazma'}
                    </Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}