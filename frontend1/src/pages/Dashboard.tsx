import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FileText,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Droplets,
  Calendar,
  Phone
} from 'lucide-react';

export function Dashboard() {
  const { user, hasRole } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Xayrli tong';
    if (hour < 18) return 'Xayrli kun';
    return 'Xayrli kech';
  };

  const renderSuperAdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Jami mijozlar"
          value="1,247"
          change="+12% so'nggi oyda"
          changeType="positive"
          icon={<Users className="w-6 h-6 text-sky-600" />}
        />
        <StatCard
          title="Faol hisoblar"
          value="234"
          change="+5% so'nggi hafta"
          changeType="positive"
          icon={<FileText className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="Oylik daromad"
          value="245M so'm"
          change="+18% so'nggi oyda"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
        />
        <StatCard
          title="Qarzli mijozlar"
          value="89"
          change="-7% so'nggi oyda"
          changeType="positive"
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>So'nggi faoliyat</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Yangi mijoz qo'shildi", user: "Admin", time: "5 daqiqa oldin" },
                { action: "To'lov qabul qilindi", user: "Kassir", time: "15 daqiqa oldin" },
                { action: "Hisob-kitob yaratildi", user: "Admin", time: "1 soat oldin" },
                { action: "Qarz yig'ildi", user: "Collector", time: "2 soat oldin" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-600">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Diqqat talab etuvchi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-800">Muddati o'tgan qarzlar</span>
                  <Badge variant="destructive">23</Badge>
                </div>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-yellow-800">To'lov kutilayotgan</span>
                  <Badge variant="secondary">156</Badge>
                </div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-800">Yangi so'rovlar</span>
                  <Badge variant="outline">12</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCashierDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Bugungi to'lovlar"
          value="45"
          change="+8 so'nggi soatda"
          changeType="positive"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="Jami summa"
          value="12.5M so'm"
          change="Bugungi yig'ilgan"
          changeType="neutral"
          icon={<FileText className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="Kutilayotgan"
          value="23"
          change="To'lov navbatida"
          changeType="neutral"
          icon={<Calendar className="w-6 h-6 text-orange-600" />}
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Bugungi to'lovlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { customer: "Aliyev Vali", amount: "125,000 so'm", time: "09:15", status: "Bajarildi" },
              { customer: "Karimova Guli", amount: "89,500 so'm", time: "10:30", status: "Bajarildi" },
              { customer: "Toshev Umar", amount: "156,000 so'm", time: "11:45", status: "Kutilayotgan" },
            ].map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{payment.customer}</p>
                  <p className="text-sm text-gray-600">{payment.amount}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{payment.time}</p>
                  <Badge 
                    variant={payment.status === 'Bajarildi' ? 'default' : 'secondary'}
                    className={payment.status === 'Bajarildi' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDebtCollectionDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Qarzli mijozlar"
          value="89"
          change="-5 so'nggi haftada"
          changeType="positive"
          icon={<AlertTriangle className="w-6 h-6 text-red-600" />}
        />
        <StatCard
          title="Jami qarz"
          value="15.2M so'm"
          change="Yig'ish kerak"
          changeType="neutral"
          icon={<DollarSign className="w-6 h-6 text-orange-600" />}
        />
        <StatCard
          title="Bugun aloqa"
          value="12"
          change="Mijozlar bilan"
          changeType="neutral"
          icon={<Phone className="w-6 h-6 text-blue-600" />}
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Eng katta qarzlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { customer: "Abdullayev Said", debt: "850,000 so'm", days: "45 kun", phone: "+998901234567" },
              { customer: "Nazarova Malika", debt: "650,000 so'm", days: "32 kun", phone: "+998901234568" },
              { customer: "Rustamov Bekzod", debt: "480,000 so'm", days: "28 kun", phone: "+998901234569" },
            ].map((debtor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p className="font-medium text-gray-900">{debtor.customer}</p>
                  <p className="text-sm text-gray-600">{debtor.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-red-700">{debtor.debt}</p>
                  <p className="text-sm text-red-600">{debtor.days}</p>
                </div>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Aloqa
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCustomerServiceDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Bugungi so'rovlar"
          value="18"
          change="+3 so'nggi soatda"
          changeType="positive"
          icon={<Phone className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="Hal qilingan"
          value="15"
          change="Bugun"
          changeType="positive"
          icon={<Users className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="Kutilayotgan"
          value="3"
          change="Javob berish kerak"
          changeType="neutral"
          icon={<AlertTriangle className="w-6 h-6 text-orange-600" />}
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Faol so'rovlar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { customer: "Yusupov Anvar", issue: "Suv sifati haqida", time: "30 min oldin", priority: "Yuqori" },
              { customer: "Rahimova Nargiza", issue: "Hisobot xatoligi", time: "1 soat oldin", priority: "O'rtacha" },
              { customer: "Salimov Jamshid", issue: "Yangi ulanish", time: "2 soat oldin", priority: "Past" },
            ].map((request, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{request.customer}</p>
                  <p className="text-sm text-gray-600">{request.issue}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{request.time}</p>
                  <Badge 
                    variant="outline"
                    className={
                      request.priority === 'Yuqori' 
                        ? 'border-red-300 text-red-700' 
                        : request.priority === 'O\'rtacha'
                        ? 'border-yellow-300 text-yellow-700'
                        : 'border-green-300 text-green-700'
                    }
                  >
                    {request.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDefaultDashboard = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Mening vazifalari"
          value="8"
          change="Bugungi kun uchun"
          changeType="neutral"
          icon={<FileText className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="Faol mijozlar"
          value="156"
          change="Mening javobgarligim"
          changeType="neutral"
          icon={<Users className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="Bugungi ish"
          value="75%"
          change="Bajarilgan"
          changeType="positive"
          icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
        />
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Bugungi vazifalar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="font-medium text-blue-900">Sizning rolangiz uchun maxsus dashboard tez orada qo'shiladi</p>
              <p className="text-sm text-blue-700 mt-1">Hozircha umumiy ma'lumotlarni ko'rishingiz mumkin</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const getDashboardContent = () => {
    switch (user?.role) {
      case 'superadmin':
      case 'admin':
        return renderSuperAdminDashboard();
      case 'cashier':
        return renderCashierDashboard();
      case 'debt_collection':
        return renderDebtCollectionDashboard();
      case 'customer_service':
        return renderCustomerServiceDashboard();
      default:
        return renderDefaultDashboard();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {getGreeting()}, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Bugungi holat va faoliyatingizni kuzatib boring
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="w-8 h-8 text-sky-500" />
          <Badge variant="outline" className="capitalize">
            {user?.role?.replace('_', ' ')}
          </Badge>
        </div>
      </div>

      {getDashboardContent()}
    </div>
  );
}