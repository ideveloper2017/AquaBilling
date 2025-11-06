// src/components/layout/sidebar.tsx
import { Link, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useAuth } from "@/context/auth-context"
import {
    LayoutDashboard,
    Users,
    Gauge,
    FileText,
    CreditCard,
    BarChart2,
    Settings,
    LogOut,
    User,
    Home,
    Activity,
    Bell,
    FileCheck,
    CalendarCheck,
    CalendarClock,
    CalendarDays,
    CalendarPlus,
    CalendarRange,
    CalendarSearch,
    CalendarX,
    Calendar,
    CalendarIcon,
    Clock,
    Clock3,
    Clock4,
    Clock5,
    Clock7,
    Clock8,
    Clock9,
    Clock10,
    Clock11,
    Clock12,
    Clock1,
    Clock2,
} from "lucide-react"

const sidebarItems = [
    {
        title: "Asosiy",
        items: [
            {
                title: "Boshqaruv paneli",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
        ],
    },
    {
        title: "Mijozlar",
        items: [
            {
                title: "Mijozlar ro'yxati",
                href: "/customers",
                icon: Users,
            },
            {
                title: "Qo'shish",
                href: "/customers/new",
                icon: User,
            },
        ],
    },
    {
        title: "Hisoblagichlar",
        items: [
            {
                title: "Barcha hisoblagichlar",
                href: "/meters",
                icon: Gauge,
            },
            {
                title: "Ko'rishlar tarixi",
                href: "/readings",
                icon: Activity,
            },
        ],
    },
    {
        title: "To'lovlar",
        items: [
            {
                title: "Hisob-fakturalar",
                href: "/invoices",
                icon: FileText,
            },
            {
                title: "To'lovlar",
                href: "/payments",
                icon: CreditCard,
            },
            {
                title: "Qarzdorlar",
                href: "/debtors",
                icon: FileCheck,
            },
        ],
    },
    {
        title: "Xisobotlar",
        items: [
            {
                title: "Statistika",
                href: "/reports",
                icon: BarChart2,
            },
        ],
    },
]

export function Sidebar({ className }: { className?: string }) {
    const location = useLocation()
    const { user } = useAuth()

    // Filter sidebar items based on user role
    const filteredSidebarItems = sidebarItems.map((section) => {
        // Add role-based filtering here if needed
        return section
    })

    return (
        <div className={cn("flex h-screen flex-col", className)}>
            <div className="flex h-14 items-center border-b px-4">
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-lg font-bold">AquaBilling</span>
                </Link>
            </div>
            <ScrollArea className="flex-1">
                <div className="space-y-1 p-3">
                    {filteredSidebarItems.map((section, index) => (
                        <div key={index} className="py-2">
                            <h2 className="mb-2 px-4 text-sm font-medium text-muted-foreground">
                                {section.title}
                            </h2>
                            <div className="space-y-1">
                                {section.items.map((item) => (
                                    <Button
                                        key={item.href}
                                        variant={location.pathname === item.href ? "secondary" : "ghost"}
                                        asChild
                                        className="w-full justify-start"
                                    >
                                        <Link to={item.href}>
                                            <item.icon className="mr-2 h-4 w-4" />
                                            {item.title}
                                        </Link>
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <div className="border-t p-4">
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link to="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Sozlamalar
                    </Link>
                </Button>
            </div>
        </div>
    )
}