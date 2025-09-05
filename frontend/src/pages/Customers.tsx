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
import { Textarea } from '@/components/ui/textarea';
import { Customer } from '@/types';
import { Plus, Edit, Trash2, Search, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Customers() {
  const { hasPermission } = useAuth();
  const { toast } = useToast();
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Aliyev Vali Akramovich',
      email: 'vali.aliyev@email.com',
      phone: '+998901234567',
      address: 'Toshkent sh., Yunusobod t., 15-uy',
      meterNumber: 'WM001234',
      connectionDate: new Date('2023-01-15'),
      status: 'active',
      balance: -125000,
      lastReading: 1250,
      previousReading: 1180,
    },
    {
      id: '2',
      name: 'Karimova Gulnora Saidovna',
      email: 'gulnora.karimova@email.com',
      phone: '+998901234568',
      address: 'Toshkent sh., Mirzo Ulug\'bek t., 45-uy',
      meterNumber: 'WM001235',
      connectionDate: new Date('2023-02-20'),
      status: 'active',
      balance: 0,
      lastReading: 890,
      previousReading: 820,
    },
    {
      id: '3',
      name: 'Toshev Umar Rahimovich',
      email: 'umar.toshev@email.com',
      phone: '+998901234569',
      address: 'Toshkent sh., Shayxontohur t., 78-uy',
      meterNumber: 'WM001236',
      connectionDate: new Date('2023-03-10'),
      status: 'suspended',
      balance: -450000,
      lastReading: 2100,
      previousReading: 1980,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    meterNumber: '',
    status: 'active' as Customer['status'],
    lastReading: 0,
    previousReading: 0,
  });

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.meterNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCustomer) {
      setCustomers(customers.map(customer => 
        customer.id === editingCustomer.id 
          ? { 
              ...customer, 
              ...formData,
              balance: customer.balance // Keep existing balance
            }
          : customer
      ));
      toast({
        title: 'Muvaffaqiyat',
        description: 'Mijoz ma\'lumotlari yangilandi',
      });
    } else {
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
        connectionDate: new Date(),
        balance: 0,
      };
      setCustomers([...customers, newCustomer]);
      toast({
        title: 'Muvaffaqiyat',
        description: 'Yangi mijoz qo\'shildi',
      });
    }

    setIsDialogOpen(false);
    setEditingCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      meterNumber: '',
      status: 'active',
      lastReading: 0,
      previousReading: 0,
    });
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      meterNumber: customer.meterNumber,
      status: customer.status,
      lastReading: customer.lastReading,
      previousReading: customer.previousReading,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (customerId: string) => {
    setCustomers(customers.filter(customer => customer.id !== customerId));
    toast({
      title: 'Muvaffaqiyat',
      description: 'Mijoz o\'chirildi',
    });
  };

  const getStatusBadge = (status: Customer['status']) => {
    const statusConfig = {
      active: { label: 'Faol', variant: 'default' as const, className: 'bg-green-100 text-green-800' },
      inactive: { label: 'Nofaol', variant: 'secondary' as const, className: 'bg-gray-100 text-gray-800' },
      suspended: { label: 'To\'xtatilgan', variant: 'destructive' as const, className: 'bg-red-100 text-red-800' },
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const formatBalance = (balance: number) => {
    const absBalance = Math.abs(balance);
    const formatted = absBalance.toLocaleString('uz-UZ');
    return balance < 0 ? `-${formatted} so'm` : `${formatted} so'm`;
  };

  if (!hasPermission('customer_management') && !hasPermission('customer_view')) {
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
          <h1 className="text-3xl font-bold text-gray-900">Mijozlar</h1>
          <p className="text-gray-600 mt-1">Suv iste'molchilari ma'lumotlari</p>
        </div>
        
        {hasPermission('customer_management') && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-sky-500 hover:bg-sky-600">
                <Plus className="w-4 h-4 mr-2" />
                Yangi mijoz
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingCustomer ? 'Mijozni tahrirlash' : 'Yangi mijoz'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ism familiya</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="To'liq ism familiya"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="meterNumber">Hisoblagich raqami</Label>
                    <Input
                      id="meterNumber"
                      value={formData.meterNumber}
                      onChange={(e) => setFormData({ ...formData, meterNumber: e.target.value })}
                      placeholder="WM001234"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+998901234567"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Manzil</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="To'liq manzil"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Holat</Label>
                    <Select value={formData.status} onValueChange={(value: Customer['status']) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Faol</SelectItem>
                        <SelectItem value="inactive">Nofaol</SelectItem>
                        <SelectItem value="suspended">To'xtatilgan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="previousReading">Oldingi ko'rsatkich</Label>
                    <Input
                      id="previousReading"
                      type="number"
                      value={formData.previousReading}
                      onChange={(e) => setFormData({ ...formData, previousReading: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lastReading">Joriy ko'rsatkich</Label>
                    <Input
                      id="lastReading"
                      type="number"
                      value={formData.lastReading}
                      onChange={(e) => setFormData({ ...formData, lastReading: Number(e.target.value) })}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Bekor qilish
                  </Button>
                  <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                    {editingCustomer ? 'Yangilash' : 'Qo\'shish'}
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
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Faol mijozlar</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <MapPin className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">To'xtatilgan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.status === 'suspended').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Mail className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Qarzli mijozlar</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.balance < 0).length}
                </p>
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
                <p className="text-sm text-gray-600">Jami mijozlar</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Mijozlar ro'yxati</CardTitle>
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
                <TableHead>Mijoz</TableHead>
                <TableHead>Hisoblagich</TableHead>
                <TableHead>Manzil</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Balans</TableHead>
                <TableHead>Iste'mol</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{customer.name}</p>
                      <p className="text-sm text-gray-600">{customer.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{customer.meterNumber}</TableCell>
                  <TableCell className="max-w-xs truncate">{customer.address}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell>
                    <span className={customer.balance < 0 ? 'text-red-600 font-medium' : 'text-green-600 font-medium'}>
                      {formatBalance(customer.balance)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">
                      {customer.lastReading - customer.previousReading} m³
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {hasPermission('customer_management') && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(customer)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(customer.id)}
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