import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

/**
 * Checks if the admin token is valid and not expired.
 */
function isAuthenticated() {
    const token = localStorage.getItem("admin_token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        // Check if token is expired (exp is in seconds)
        if (decoded.exp && Date.now() >= decoded.exp * 1000) {
            // Optional: Clear expired token
            localStorage.removeItem("admin_token");
            return false;
        }
        return true;
    } catch (e) {
        // Invalid token
        localStorage.removeItem("admin_token");
        return false;
    }
}

function ProtectedRoute() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        // Example: check for token
        const token = localStorage.getItem("admin_token");
        setIsAuthenticated(!!token);
    }, []);

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Card className="max-w-md w-full">
                    <CardContent className="flex flex-col items-center gap-4 py-8">
                        <AlertCircle className="w-10 h-10 text-destructive" />
                        <div className="text-lg font-semibold text-destructive">Access Denied</div>
                        <div className="text-muted-foreground text-center">You must be logged in as an admin to access this page.</div>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return <Outlet />;
}

export default ProtectedRoute;
