import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Users, DollarSign } from "lucide-react";

function DashboardHome() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users className="w-6 h-6 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+5% from last week</p>
                </CardContent>
            </Card>
            <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                    <DollarSign className="w-6 h-6 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$12,345</div>
                    <p className="text-xs text-muted-foreground">+2.1% from last week</p>
                </CardContent>
            </Card>
            <Card className="col-span-1">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
                    <BarChart2 className="w-6 h-6 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">87</div>
                    <p className="text-xs text-muted-foreground">-1.2% from last week</p>
                </CardContent>
            </Card>

            {/* Sample Bar Chart (Placeholder) */}
            <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                    <CardTitle>Weekly User Growth</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                        {/* Replace with a real chart library in production */}
                        <svg width="100%" height="100%" viewBox="0 0 300 100">
                            <rect x="10" y="60" width="30" height="30" fill="#3b82f6" />
                            <rect x="50" y="40" width="30" height="50" fill="#3b82f6" />
                            <rect x="90" y="20" width="30" height="70" fill="#3b82f6" />
                            <rect x="130" y="50" width="30" height="40" fill="#3b82f6" />
                            <rect x="170" y="30" width="30" height="60" fill="#3b82f6" />
                            <rect x="210" y="10" width="30" height="80" fill="#3b82f6" />
                        </svg>
                        <span className="absolute text-xs">(Sample Bar Chart)</span>
                    </div>
                </CardContent>
            </Card>

            {/* Sample Table (Placeholder) */}
            <Card className="col-span-1 md:col-span-1">
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="text-sm space-y-2">
                        <li>John Doe added a new user</li>
                        <li>Jane Smith updated her profile</li>
                        <li>Admin generated a report</li>
                        <li>New user registered</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

export default DashboardHome; 