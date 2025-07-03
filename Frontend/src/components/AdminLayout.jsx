import { Link, Outlet, useLocation } from "react-router-dom";
import { Moon, Sun, User, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
    { to: "/admin/dashboard/home", label: "Dashboard", icon: <User /> },
    { to: "/admin/dashboard/users", label: "Manage Users", icon: <Users /> },
];

export default function AdminLayout({ theme, toggleTheme }) {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
                <div className="h-20 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
                    <span className="text-2xl font-bold text-blue-600">Admin Panel</span>
                </div>
                <nav className="flex-1 py-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center px-6 py-3 mb-2 rounded-lg transition-colors ${location.pathname === item.to
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                                }`}
                        >
                            <span className="mr-3">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </aside>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-gray-800 shadow">
                    <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {navItems.find((item) => location.pathname.includes(item.to))?.label || "Admin"}
                    </h1>
                    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                        {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </Button>
                </header>
                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
} 