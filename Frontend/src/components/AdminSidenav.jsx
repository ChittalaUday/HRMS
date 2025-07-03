import { NavLink } from "react-router-dom";
import { Sidebar } from "@/components/ui/sidebar";
import { Home, Users } from "lucide-react";

const iconMap = {
    "Dashboard": <Home className="w-5 h-5 mr-2" />,
    "Manage Users": <Users className="w-5 h-5 mr-2" />,
};

function AdminSidenav({ items }) {
    return (
        <Sidebar className="min-h-screen shadow-md">
            <h2 className="text-xl font-bold mb-8 text-blue-700 px-4 pt-4">Admin Panel</h2>
            <nav className="flex flex-col gap-2">
                {items.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center px-4 py-2 rounded-lg transition text-base font-medium ${isActive ? "bg-blue-100 text-blue-700" : "hover:bg-blue-50 text-gray-700"}`
                        }
                    >
                        {iconMap[item.label]}
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </Sidebar>
    );
}

export default AdminSidenav; 