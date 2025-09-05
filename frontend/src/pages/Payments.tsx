import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Payment } from '@/types';
import { Plus, Search, CreditCard, DollarSign, Calendar, CheckCircle, XCircle, Clock, Receipt } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Payments() {
  const { hasPermission } = useAuth();
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      billId: '1',
      customerId: '1',
      amount: 105000,
      paymentMethod: 'cash',
      paymentDate: new Date('2024-01-20'),
      collectedBy: 'Kassir Olimjon',
      status: 'completed',
    },
    {
      id: '2',
      billId: '2',
      customerId: '2',
      amount: 105000,
      paymentMethod: 'card',
      paymentDate: new Date('2024-01-22'),
      collectedBy: 'Kassir Olimjon',
      status: 'completed',
    },
    {
      id: '3',
      billId: '3',
      customerId: '3',
      amount: 90000,
      paymentMethod: 'transfer',
      paymentDate: new Date('2024-01-25'),
      collectedBy: 'Kassir Olimjon',
      status: 'pending',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    billId: '',
    customerId: '',
    customerName: '',
    amount: 0,
    paymentMethod: 'cash' as Payment['paymentMethod'],
    collectedBy: '',
  });

  // Mock bill data for selection
  const availableBills = [
    { id: '1', billNumber: 'BILL-2024-001', customerName: 'Aliyev Vali', amount: 105000 },
    { id: '2', billNumber: 'BILL-2024-002', customerName: 'Karimova Gulnora', amount: 105000 },
    { id: '3', billNumber: 'BILL-2024-003', customerName: 'Toshev Umar', amount: 180000 },
  ];

  const filteredPayments = payments.filter(payment =>
    payment.collectedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPayment: Payment = {
      id: Date.now().toString(),
      ...formData,
      paymentDate: new Date(),
      status: 'completed',
    };
    
    setPayments([...payments, newPayment]);
    toast({
      title: 'Muvaffaqiyat',
      description: 'To\'lov muvaffaqiyatli qabul qilindi',
    });

    setIsDialogOpen(false);
    setFormData({
      billId: '',
      customerId: '',
      customerName: '',
      amount: 0,
      paymentMethod: 'cash',
      collectedBy: '',
    });
  };

  const handleBillSelect = (billId: string) => {
    const selectedBill = availableBills.find(bill => bill.id === billId);
    if (selectedBill) {
      setFormData({
        ...formData,
        billId: billId,
        customerId: billId, // In real app, this would be proper customer ID
        customerName: selectedBill.customerName,
        amount: selectedBill.amount,
      });
    }
  };

  const getStatusBadge = (status: Payment['status']) => {
    const statusConfig = {
      completed: { 
        label: 'Bajarildi', 
        variant: 'default' as const, 
        className: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="w-3 h-3" />
      },
      failed: { 
        label: 'Xatolik', 
        variant: 'destructive' as const, 
        className: 'bg-red-100 text-red-800',
        icon: <XCircle className="w-3 h-3" />
      },
      pending: { 
        label: 'Kutilayotgan', 
        variant: 'secondary' as const, 
        className: 'bg-yellow-100 text-yellow-800',
        icon: <Clock className="w-3 h-3" />
      },
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={`${config.className} flex items-center space-x-1`}>
        {config.icon}
        <span>{config.label}</span>
      </Badge>
    );
  };

  const getPaymentMethodBadge = (method: Payment['paymentMethod']) => {
    const methodConfig = {
      cash: { label: 'Naqd', className: 'bg-green-100 text-green-800' },
      card: { label: 'Karta', className: 'bg-blue-100 text-blue-800' },
      transfer: { label: 'O\'tkazma', className: 'bg-purple-100 text-purple-800' },
      mobile: { label: 'Mobil', className: 'bg-orange-100 text-orange-800' },
    };
    
    const config = methodConfig[method];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('uz-UZ') + ' so\'m';
  };

  const getTotalPayments = () => {
    return payments.reduce((total, payment) => total + payment.amount, 0);
  };

  const getTodayPayments = () => {
    const today = new Date().toDateString();
    return payments.filter(payment => 
      payment.paymentDate.toDateString() === today
    ).length;
  };

  if (!hasPermission('payments')) {
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
          <h1 className="text-3xl font-bold text-gray-900">To'lovlar</h1>
          <p className="text-gray-600 mt-1">Mijozlardan olingan to'lovlar</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sky-500 hover:bg-sky-600">
              <Plus className="w-4 h-4 mr-2" />
              Yangi to'lov
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Yangi to'lov qabul qilish</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="billSelect">Hisob-kitobni tanlang</Label>
                <Select value={formData.billId} onValueChange={handleBillSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Hisob-kitobni tanlang" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBills.map((bill) => (
                      <SelectItem key={bill.id} value={bill.id}>
                        {bill.billNumber} - {bill.customerName} ({formatAmount(bill.amount)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {formData.customerName && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Mijoz:</p>
                      <p className="font-medium">{formData.customerName}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">To'lov summasi:</p>
                      <p className="font-medium text-green-600">{formatAmount(formData.amount)}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">To'lov usuli</Label>
                  <Select 
                    value={formData.paymentMethod} 
                    onValueChange={(value: Payment['paymentMethod']) => 
                      setFormData({ ...formData, paymentMethod: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Naqd pul</SelectItem>
                      <SelectItem value="card">Bank kartasi</SelectItem>
                      <SelectItem value="transfer">Bank o'tkazmasi</SelectItem>
                      <SelectItem value="mobile">Mobil to'lov</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="amount">Summa</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="collectedBy">Qabul qiluvchi</Label>
                <Input
                  id="collectedBy"
                  value={formData.collectedBy}
                  onChange={(e) => setFormData({ ...formData, collectedBy: e.target.value })}
                  placeholder="Kassir nomi"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                  To'lovni qabul qilish
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Jami to'lovlar</p>
                <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bugungi to'lovlar</p>
                <p className="text-2xl font-bold text-gray-900">{getTodayPayments()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Jami summa</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatAmount(getTotalPayments())}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Kutilayotgan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {payments.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>To'lovlar ro'yxati</CardTitle>
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
                <TableHead>To'lov ID</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Summa</TableHead>
                <TableHead>To'lov usuli</TableHead>
                <TableHead>Sana</TableHead>
                <TableHead>Qabul qiluvchi</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono">#{payment.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">Mijoz #{payment.customerId}</p>
                      <p className="text-sm text-gray-600">Hisob #{payment.billId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    {formatAmount(payment.amount)}
                  </TableCell>
                  <TableCell>{getPaymentMethodBadge(payment.paymentMethod)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{payment.paymentDate.toLocaleDateString('uz-UZ')}</p>
                      <p className="text-gray-600">{payment.paymentDate.toLocaleTimeString('uz-UZ')}</p>
                    </div>
                  </TableCell>
                  <TableCell>{payment.collectedBy}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Receipt className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}