import AdminSidenav from "../../components/AdminSidenav";
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

const sidenavItems = [
    { label: "Dashboard", path: "/admin/dashboard/home" },
    { label: "Manage Users", path: "/admin/dashboard/users" },
    // Add more items as needed
];

function AdminDashboard() {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-muted">
                <AdminSidenav items={sidenavItems} />
                <main className="flex-1 p-8 bg-white rounded-l-3xl shadow-lg">
                    <Outlet />
                </main>
            </div>
        </SidebarProvider>
    );
}

export default AdminDashboard; 