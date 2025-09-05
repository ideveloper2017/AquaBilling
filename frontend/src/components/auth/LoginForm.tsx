import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Droplets, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        title: 'Xatolik',
        description: 'Email va parolni kiriting',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (!success) {
        toast({
          title: 'Kirish xatolik',
          description: 'Email yoki parol noto\'g\'ri',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Xatolik',
        description: 'Tizimda xatolik yuz berdi',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Super Admin', email: 'superadmin@water.com', password: '123456' },
    { role: 'Admin', email: 'admin@water.com', password: '123456' },
    { role: 'Kassir', email: 'cashier@water.com', password: '123456' },
    { role: 'Qarz yig\'ish', email: 'debt@water.com', password: '123456' },
    { role: 'Mijozlar xizmati', email: 'service@water.com', password: '123456' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="shadow-xl border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-sky-500 rounded-full">
                <Droplets className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Suv taqsimoti tizimi
            </CardTitle>
            <CardDescription className="text-gray-600">
              Tizimga kirish uchun hisobingizga kiring
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Parol
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full h-11 bg-sky-500 hover:bg-sky-600"
                disabled={isLoading}
              >
                {isLoading ? 'Kirilyapti...' : 'Kirish'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="shadow-lg border-0 bg-white/90 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg text-center text-gray-800">
              Demo hisoblar
            </CardTitle>
            <CardDescription className="text-center text-sm text-gray-600">
              Test uchun quyidagi hisoblardan birini tanlang
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => {
                    setEmail(account.email);
                    setPassword(account.password);
                  }}
                  className="p-3 text-left rounded-lg border border-gray-200 hover:border-sky-300 hover:bg-sky-50 transition-all duration-200"
                >
                  <div className="font-medium text-gray-900">{account.role}</div>
                  <div className="text-sm text-gray-600">{account.email}</div>
                </button>
              ))}
            </div>
            <div className="mt-4 text-xs text-gray-500 text-center">
              Barcha hisoblar uchun parol: 123456
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}