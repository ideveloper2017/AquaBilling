// src/pages/Login/login.tsx
import { LoginForm } from "@/components/auth/login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-slate-900 dark:to-slate-800 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">AquaBilling</CardTitle>
                    <CardDescription>
                        Iltimos, hisobingizga kiring
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                    <div className="mt-4 text-center text-sm">
                        Hisobingiz yo'qmi?{" "}
                        <button
                            className="font-medium text-primary hover:underline"
                            onClick={() => {/* Handle register navigation */}}
                        >
                            Ro'yxatdan o'tish
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}