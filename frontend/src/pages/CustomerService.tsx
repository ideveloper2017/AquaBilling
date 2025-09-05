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
import { Phone, MessageSquare, Search, Plus, Clock, CheckCircle, AlertTriangle, User, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ServiceRequest {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  requestType: 'complaint' | 'inquiry' | 'technical' | 'billing' | 'connection';
  subject: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  assignedTo: string;
  createdAt: Date;
  resolvedAt?: Date;
  notes: string;
}

export function CustomerService() {
  const { hasRole } = useAuth();
  const { toast } = useToast();
  
  const [requests, setRequests] = useState<ServiceRequest[]>([
    {
      id: '1',
      customerId: '1',
      customerName: 'Aliyev Vali',
      customerPhone: '+998901234567',
      requestType: 'complaint',
      subject: 'Suv sifati haqida shikoyat',
      description: 'Suv rangining o\'zgarishi va yomon hidning paydo bo\'lishi',
      priority: 'high',
      status: 'open',
      assignedTo: 'Mijozlar xizmati',
      createdAt: new Date('2024-01-25T09:30:00'),
      notes: '',
    },
    {
      id: '2',
      customerId: '2',
      customerName: 'Karimova Gulnora',
      customerPhone: '+998901234568',
      requestType: 'billing',
      subject: 'Hisob-kitobda xatolik',
      description: 'O\'tgan oylik hisob-kitobda ko\'rsatilgan iste\'mol noto\'g\'ri',
      priority: 'medium',
      status: 'in_progress',
      assignedTo: 'Mijozlar xizmati',
      createdAt: new Date('2024-01-24T14:15:00'),
      notes: 'Hisoblagich ko\'rsatkichlari tekshirilmoqda',
    },
    {
      id: '3',
      customerId: '3',
      customerName: 'Toshev Umar',
      customerPhone: '+998901234569',
      requestType: 'connection',
      subject: 'Yangi ulanish so\'rovi',
      description: 'Yangi qurilgan uyga suv ulanishini so\'rayapman',
      priority: 'low',
      status: 'resolved',
      assignedTo: 'Mijozlar xizmati',
      createdAt: new Date('2024-01-23T11:00:00'),
      resolvedAt: new Date('2024-01-25T16:30:00'),
      notes: 'Texnik xodimlar bilan kelishildi, ertaga ulanish amalga oshiriladi',
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    requestType: 'inquiry' as ServiceRequest['requestType'],
    subject: '',
    description: '',
    priority: 'medium' as ServiceRequest['priority'],
  });

  const filteredRequests = requests.filter(request =>
    request.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.customerPhone.includes(searchTerm)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newRequest: ServiceRequest = {
      id: Date.now().toString(),
      customerId: Date.now().toString(),
      ...formData,
      status: 'open',
      assignedTo: 'Mijozlar xizmati',
      createdAt: new Date(),
      notes: '',
    };
    
    setRequests([newRequest, ...requests]);
    toast({
      title: 'Muvaffaqiyat',
      description: 'Yangi so\'rov yaratildi',
    });

    setIsDialogOpen(false);
    setFormData({
      customerName: '',
      customerPhone: '',
      requestType: 'inquiry',
      subject: '',
      description: '',
      priority: 'medium',
    });
  };

  const handleStatusUpdate = (requestId: string, newStatus: ServiceRequest['status']) => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { 
            ...request, 
            status: newStatus,
            resolvedAt: newStatus === 'resolved' ? new Date() : request.resolvedAt
          }
        : request
    ));
    
    toast({
      title: 'Muvaffaqiyat',
      description: 'So\'rov holati yangilandi',
    });
  };

  const getStatusBadge = (status: ServiceRequest['status']) => {
    const statusConfig = {
      open: { 
        label: 'Ochiq', 
        className: 'bg-blue-100 text-blue-800',
        icon: <AlertTriangle className="w-3 h-3" />
      },
      in_progress: { 
        label: 'Jarayonda', 
        className: 'bg-yellow-100 text-yellow-800',
        icon: <Clock className="w-3 h-3" />
      },
      resolved: { 
        label: 'Hal qilingan', 
        className: 'bg-green-100 text-green-800',
        icon: <CheckCircle className="w-3 h-3" />
      },
      closed: { 
        label: 'Yopilgan', 
        className: 'bg-gray-100 text-gray-800',
        icon: <CheckCircle className="w-3 h-3" />
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

  const getPriorityBadge = (priority: ServiceRequest['priority']) => {
    const priorityConfig = {
      low: { label: 'Past', className: 'bg-green-100 text-green-800' },
      medium: { label: 'O\'rtacha', className: 'bg-yellow-100 text-yellow-800' },
      high: { label: 'Yuqori', className: 'bg-red-100 text-red-800' },
    };
    
    const config = priorityConfig[priority];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getRequestTypeBadge = (type: ServiceRequest['requestType']) => {
    const typeConfig = {
      complaint: { label: 'Shikoyat', className: 'bg-red-100 text-red-800' },
      inquiry: { label: 'So\'rov', className: 'bg-blue-100 text-blue-800' },
      technical: { label: 'Texnik', className: 'bg-purple-100 text-purple-800' },
      billing: { label: 'Hisob-kitob', className: 'bg-orange-100 text-orange-800' },
      connection: { label: 'Ulanish', className: 'bg-green-100 text-green-800' },
    };
    
    const config = typeConfig[type];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getOpenRequests = () => requests.filter(r => r.status === 'open').length;
  const getInProgressRequests = () => requests.filter(r => r.status === 'in_progress').length;
  const getResolvedToday = () => {
    const today = new Date().toDateString();
    return requests.filter(r => r.resolvedAt && r.resolvedAt.toDateString() === today).length;
  };
  const getHighPriorityRequests = () => requests.filter(r => r.priority === 'high' && r.status !== 'resolved').length;

  if (!hasRole(['customer_service'])) {
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
          <h1 className="text-3xl font-bold text-gray-900">Mijozlar xizmati</h1>
          <p className="text-gray-600 mt-1">Mijozlar so'rovlari va muammolarini hal qilish</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-sky-500 hover:bg-sky-600">
              <Plus className="w-4 h-4 mr-2" />
              Yangi so'rov
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Yangi mijoz so'rovi</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Mijoz nomi</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="To'liq ism familiya"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Telefon raqami</Label>
                  <Input
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+998901234567"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="requestType">So'rov turi</Label>
                  <Select 
                    value={formData.requestType} 
                    onValueChange={(value: ServiceRequest['requestType']) => 
                      setFormData({ ...formData, requestType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inquiry">So'rov</SelectItem>
                      <SelectItem value="complaint">Shikoyat</SelectItem>
                      <SelectItem value="technical">Texnik muammo</SelectItem>
                      <SelectItem value="billing">Hisob-kitob</SelectItem>
                      <SelectItem value="connection">Ulanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Ustuvorlik</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value: ServiceRequest['priority']) => 
                      setFormData({ ...formData, priority: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Past</SelectItem>
                      <SelectItem value="medium">O'rtacha</SelectItem>
                      <SelectItem value="high">Yuqori</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Mavzu</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="So'rov mavzusi"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Tavsif</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Batafsil tavsif..."
                  rows={4}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" className="bg-sky-500 hover:bg-sky-600">
                  Yaratish
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ochiq so'rovlar</p>
                <p className="text-2xl font-bold text-gray-900">{getOpenRequests()}</p>
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
                <p className="text-sm text-gray-600">Jarayonda</p>
                <p className="text-2xl font-bold text-gray-900">{getInProgressRequests()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bugun hal qilingan</p>
                <p className="text-2xl font-bold text-gray-900">{getResolvedToday()}</p>
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
                <p className="text-sm text-gray-600">Yuqori ustuvorlik</p>
                <p className="text-2xl font-bold text-gray-900">{getHighPriorityRequests()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Mijozlar so'rovlari</CardTitle>
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
                <TableHead>Tur</TableHead>
                <TableHead>Mavzu</TableHead>
                <TableHead>Ustuvorlik</TableHead>
                <TableHead>Holat</TableHead>
                <TableHead>Yaratilgan</TableHead>
                <TableHead className="text-right">Amallar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{request.customerName}</p>
                      <p className="text-sm text-gray-600">{request.customerPhone}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getRequestTypeBadge(request.requestType)}</TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="font-medium truncate">{request.subject}</p>
                      <p className="text-sm text-gray-600 truncate">{request.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{request.createdAt.toLocaleDateString('uz-UZ')}</p>
                      <p className="text-gray-600">{request.createdAt.toLocaleTimeString('uz-UZ')}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      {request.status !== 'resolved' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusUpdate(request.id, 'resolved')}
                          className="text-green-600 hover:text-green-700"
                        >
                          Hal qilish
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
    </div>
  );
}