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
import { Bill } from '@/types';
import { Plus, Edit, Trash2, Search, FileText, DollarSign, Calendar, AlertTriangle, Eye, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Bills() {
  const { hasPermission } = useAuth();
  const { toast } = useToast();
  const [bills, setBills] = useState<Bill[]>([
    {
      id: '1',
      customerId: '1',
      customerName: 'Aliyev Vali Akramovich',
      billNumber: 'BILL-2024-001',
      meterReading: 1250,
      previousReading: 1180,
      consumption: 70,
      ratePerUnit: 1500,
      amount: 105000,
      dueDate: new Date('2024-02-15'),
      status: 'pending',
      createdAt: new Date('2024-01-15'),
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'Karimova Gulnora Saidovna',
      billNumber: 'BILL-2024-002',
      meterReading: 890,
      previousReading: 820,
      consumption: 70,
      ratePerUnit: 1500,
      amount: 105000,
      dueDate: new Date('2024-02-20'),
      status: 'paid',
      createdAt: new Date('2024-01-20'),
    },
    {
      id: '3',
      customerId: '3',
      customerName: 'Toshev Umar Rahimovich',
      billNumber: 'BILL-2024-003',
      meterReading: 2100,
      previousReading: 1980,
      consumption: 120,
      ratePerUnit: 1500,
      amount: 180000,
      dueDate: new Date('2024-01-10'),
      status: 'overdue',
      createdAt: new Date('2024-01-10'),
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    billNumber: '',
    meterReading: 0,
    previousReading: 0,
    ratePerUnit: 1500,
    dueDate: '',
    status: 'pending' as Bill['status'],
  });

  const filteredBills = bills.filter(bill =>
    bill.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const consumption = formData.meterReading - formData.previousReading;
    const amount = consumption * formData.ratePerUnit;
    
    if (editingBill) {
      setBills(bills.map(bill => 
        bill.id === editingBill.id 
          ? { 
              ...bill, 
              ...formData,
              consumption,
              amount,
              dueDate: new Date(formData.dueDate),
            }
          : bill
      ));
      toast({
        title: 'Muvaffaqiyat',
        description: 'Hisob-kitob yangilandi',
      });
    } else {
      const newBill: Bill = {
        id: Date.now().toString(),
        customerId: Date.now().toString(),
        ...formData,
        consumption,
        amount,
        dueDate: new Date(formData.dueDate),
        createdAt: new Date(),
      };
      setBills([...bills, newBill]);
      toast({
        title: 'Muvaffaqiyat',
        description: 'Yangi hisob-kitob yaratildi',
      });
    }

    setIsDialogOpen(false);
    setEditingBill(null);
    setFormData({
      customerName: '',
      billNumber: '',
      meterReading: 0,
      previousReading: 0,
      ratePerUnit: 1500,
      dueDate: '',
      status: 'pending',
    });
  };

  const handleEdit = (bill: Bill) => {
    setEditingBill(bill);
    setFormData({
      customerName: bill.customerName,
      billNumber: bill.billNumber,
      meterReading: bill.meterReading,
      previousReading: bill.previousReading,
      ratePerUnit: bill.ratePerUnit,
      dueDate: bill.dueDate.toISOString().split('T')[0],
      status: bill.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (billId: string) => {
    setBills(bills.filter(bill => bill.id !== billId));
    toast({
      title: 'Muvaffaqiyat',
      description: 'Hisob-kitob o\'chirildi',
    });
  };

  const getStatusBadge = (status: Bill['status']) => {
    const statusConfig = {
      pending: { label: 'Kutilayotgan', variant: 'secondary' as const, className: 'bg-yellow-100 text-yellow-800' },
      paid: { label: 'To\'langan', variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      overdue: { label: 'Muddati o\'tgan', variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
      cancelled: { label: 'Bekor qilingan', variant: 'outline' as const, className: 'bg-gray-100 text-gray-800' },
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('uz-UZ') + ' so\'m';
  };

  const generateBillNumber = () => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `BILL-${year}-${month}-${random}`;
  };

  if (!hasPermission('billing') && !hasPermission('billing_support')) {
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
          <h1 className="text-3xl font-bold text-gray-900">Hisob-kitoblar</h1>
          <p className="text-gray-600 mt-1">Suv iste'moli hisob-kitoblari</p>
        </div>
        
        {hasPermission('billing') && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-sky-500 hover:bg-sky-600">
                <Plus className="w-4 h-4 mr-2" />
                Yangi hisob-kitob
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingBill ? 'Hisob-kitobni tahrirlash' : 'Yangi hisob-kitob'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="customerName">Mijoz nomi</Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      placeholder="Mijoz nomini kiriting"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="billNumber">Hisob-kitob raqami</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="billNumber"
                        value={formData.billNumber}
                        onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
                        placeholder="BILL-2024-001"
                        required
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setFormData({ ...formData, billNumber: generateBillNumber() })}
                      >
                        Avtomatik
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="previousReading">Oldingi ko'rsatkich</Label>
                    <Input
                      id="previousReading"
                      type="number"
                      value={formData.previousReading}
                      onChange={(e) => setFormData({ ...formData, previousReading: Number(e.target.value) })}
                      placeholder="0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meterReading">Joriy ko'rsatkich</Label>
                    <Input
                      id="meterReading"
                      type="number"
                      value={formData.meterReading}
                      onChange={(e) => setFormData({ ...formData, meterReading: Number(e.target.value) })}
                      placeholder="0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="consumption">Iste'mol</Label>
                    <Input
                      id="consumption"
                      type="number"
                      value={formData.meterReading - formData.previousReading}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ratePerUnit">Tarif (so'm/m³)</Label>
                    <Input
                      id="ratePerUnit"
                      type="number"
                      value={formData.ratePerUnit}
                      onChange={(e) => setFormData({ ...formData, ratePerUnit: Number(e.target.value) })}
                      placeholder="1500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="amount">Jami summa</Label>
                    <Input
                      id="amount"
                      value={formatAmount((formData.meterReading - formData.previousReading) * formData.ratePerUnit)}
                      disabled
                      className="bg-gray-50"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">To'lov muddati</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Holat</Label>
                    <Select value={formData.status} onValueChange={(value: Bill['status']) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Kutilayotgan</SelectItem>
                        <SelectItem value="paid">To'langan</SelectItem>
                        <SelectItem value="overdue">Muddati o'tgan</SelectItem>
                        <SelectItem value="cancelled">Bekor qilingan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Bekor qilish
                  </Button>
                  <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                    {editingBill ? 'Yangilash' : 'Yaratish'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Jami hisob-kitoblar</p>
                <p className="text-2xl font-bold text-gray-900">{bills.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Calendar className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Kutilayotgan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bills.filter(b => b.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">To'langan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bills.filter(b => b.status === 'paid').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Muddati o'tgan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {bills.filter(b => b.status === 'overdue').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Hisob-kitoblar ro'yxati</CardTitle>
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
                <TableHead>Hisob-kitob raqami</TableHead>
                <TableHead>Mijoz</TableHead>
                <TableHead>Iste'mol</TableHead>
                <TableHead>Summa</TableHead>
                <TableHead>Muddat</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBills.map((bill) => (
                <TableRow key={bill.id}>
                  <TableCell className="font-mono">{bill.billNumber}</TableCell>
                  <TableCell className="font-medium">{bill.customerName}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-mono">{bill.consumption} m³</p>
                      <p className="text-gray-600">{bill.previousReading} → {bill.meterReading}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{formatAmount(bill.amount)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{bill.dueDate.toLocaleDateString('uz-UZ')}</p>
                      {bill.status === 'overdue' && (
                        <p className="text-red-600 text-xs">
                          {Math.floor((Date.now() - bill.dueDate.getTime()) / (1000 * 60 * 60 * 24))} kun kechikdi
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(bill.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                      {hasPermission('billing') && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(bill)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(bill.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
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