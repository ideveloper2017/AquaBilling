import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { DebtRecord } from '@/types';
import { Search, AlertTriangle, Phone, MessageSquare, Calendar, DollarSign, Users, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Debts() {
  const { hasPermission } = useAuth();
  const { toast } = useToast();
  const [debts, setDebts] = useState<DebtRecord[]>([
    {
      id: '1',
      customerId: '1',
      customerName: 'Aliyev Vali Akramovich',
      totalDebt: 850000,
      overdueDays: 45,
      lastContactDate: new Date('2024-01-10'),
      status: 'active',
      notes: 'Telefon qilingan, to\'lashga va\'da bergan',
    },
    {
      id: '2',
      customerId: '3',
      customerName: 'Toshev Umar Rahimovich',
      totalDebt: 450000,
      overdueDays: 28,
      lastContactDate: new Date('2024-01-15'),
      status: 'in_collection',
      notes: 'Qiyin ahvol, to\'lov rejasi tuzilgan',
    },
    {
      id: '3',
      customerId: '4',
      customerName: 'Nazarova Malika Saidovna',
      totalDebt: 650000,
      overdueDays: 32,
      status: 'active',
      notes: 'Aloqa o\'rnatilmagan',
    },
  ]);

  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<DebtRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [contactNote, setContactNote] = useState('');

  const filteredDebts = debts.filter(debt =>
    debt.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    debt.customerId.includes(searchTerm)
  );

  const handleContact = (debt: DebtRecord) => {
    setSelectedDebt(debt);
    setContactNote('');
    setIsContactDialogOpen(true);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedDebt) {
      setDebts(debts.map(debt => 
        debt.id === selectedDebt.id 
          ? { 
              ...debt, 
              lastContactDate: new Date(),
              notes: contactNote,
              status: 'in_collection' as const
            }
          : debt
      ));
      
      toast({
        title: 'Muvaffaqiyat',
        description: 'Aloqa ma\'lumoti saqlandi',
      });
    }

    setIsContactDialogOpen(false);
    setSelectedDebt(null);
    setContactNote('');
  };

  const markAsResolved = (debtId: string) => {
    setDebts(debts.map(debt => 
      debt.id === debtId 
        ? { ...debt, status: 'resolved' as const }
        : debt
    ));
    
    toast({
      title: 'Muvaffaqiyat',
      description: 'Qarz hal qilingan deb belgilandi',
    });
  };

  const getStatusBadge = (status: DebtRecord['status']) => {
    const statusConfig = {
      active: { 
        label: 'Faol', 
        className: 'bg-red-100 text-red-800',
        icon: <AlertTriangle className="w-3 h-3" />
      },
      in_collection: { 
        label: 'Yig\'ilayotgan', 
        className: 'bg-yellow-100 text-yellow-800',
        icon: <Clock className="w-3 h-3" />
      },
      resolved: { 
        label: 'Hal qilingan', 
        className: 'bg-green-100 text-green-800',
        icon: <Users className="w-3 h-3" />
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

  const getPriorityBadge = (overdueDays: number) => {
    if (overdueDays > 60) {
      return <Badge variant="destructive">Yuqori</Badge>;
    } else if (overdueDays > 30) {
      return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">O'rtacha</Badge>;
    } else {
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">Past</Badge>;
    }
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('uz-UZ') + ' so\'m';
  };

  const getTotalDebt = () => {
    return debts.reduce((total, debt) => total + debt.totalDebt, 0);
  };

  const getActiveDebts = () => {
    return debts.filter(debt => debt.status === 'active').length;
  };

  const getHighPriorityDebts = () => {
    return debts.filter(debt => debt.overdueDays > 60).length;
  };

  if (!hasPermission('debt_management')) {
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
          <h1 className="text-3xl font-bold text-gray-900">Qarzlar</h1>
          <p className="text-gray-600 mt-1">Qarzli mijozlar va yig'ish jarayoni</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Faol qarzlar</p>
                <p className="text-2xl font-bold text-gray-900">{getActiveDebts()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Jami qarz</p>
                <p className="text-lg font-bold text-gray-900">
                  {formatAmount(getTotalDebt())}
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
                <p className="text-sm text-gray-600">Yuqori ustuvorlik</p>
                <p className="text-2xl font-bold text-gray-900">{getHighPriorityDebts()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Hal qilingan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {debts.filter(d => d.status === 'resolved').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Qarzlar ro'yxati</CardTitle>
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
                <TableHead>Qarz summasi</TableHead>
                <TableHead>Kechikish</TableHead>
                <TableHead>Ustuvorlik</TableHead>
                <TableHead>Oxirgi aloqa</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDebts.map((debt) => (
                <TableRow key={debt.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{debt.customerName}</p>
                      <p className="text-sm text-gray-600">ID: {debt.customerId}</p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-red-600">
                    {formatAmount(debt.totalDebt)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="font-medium">{debt.overdueDays} kun</p>
                      <p className="text-gray-600">Muddati o'tgan</p>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(debt.overdueDays)}</TableCell>
                  <TableCell>
                    {debt.lastContactDate ? (
                      <div className="text-sm">
                        <p>{debt.lastContactDate.toLocaleDateString('uz-UZ')}</p>
                        <p className="text-gray-600">
                          {Math.floor((Date.now() - debt.lastContactDate.getTime()) / (1000 * 60 * 60 * 24))} kun oldin
                        </p>
                      </div>
                    ) : (
                      <span className="text-gray-500">Hech qachon</span>
                    )}
                  </TableCell>
                  <TableCell>{getStatusBadge(debt.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleContact(debt)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      {debt.status !== 'resolved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsResolved(debt.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          Hal qilindi
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Mijoz bilan aloqa</DialogTitle>
          </DialogHeader>
          {selectedDebt && (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Mijoz:</p>
                    <p className="font-medium">{selectedDebt.customerName}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Qarz summasi:</p>
                    <p className="font-medium text-red-600">{formatAmount(selectedDebt.totalDebt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Kechikish:</p>
                    <p className="font-medium">{selectedDebt.overdueDays} kun</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Oxirgi aloqa:</p>
                    <p className="font-medium">
                      {selectedDebt.lastContactDate 
                        ? selectedDebt.lastContactDate.toLocaleDateString('uz-UZ')
                        : 'Hech qachon'
                      }
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactNote">Aloqa natijasi</Label>
                <Textarea
                  id="contactNote"
                  value={contactNote}
                  onChange={(e) => setContactNote(e.target.value)}
                  placeholder="Mijoz bilan suhbat natijasini yozing..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Saqlash
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}