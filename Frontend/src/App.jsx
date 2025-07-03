import { useState } from "react";
import "./App.css";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/admin/adminLogin";
import NotFound from "./pages/NotFound";
import DashboardHome from "./pages/dashboard/DashboardHome";
import ManageUsers from "./pages/admin/users/ManageUsers";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import AdminLayout from "./components/AdminLayout";

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={theme === "dark" ? "dark" : ""}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard/*"
              element={<AdminLayout theme={theme} toggleTheme={toggleTheme} />}
            >
              <Route path="home" element={<DashboardHome />} />
              <Route path="users" element={<ManageUsers />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
