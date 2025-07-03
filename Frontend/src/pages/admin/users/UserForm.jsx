import { useState, useEffect } from "react";
import { getRoles } from "../../../api/admin/users";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function capitalizeWords(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(mobile) {
    return /^\d{10,15}$/.test(mobile);
}

function UserForm({ initialData = {}, onSubmit, onCancel }) {
    const [name, setName] = useState(initialData.name || "");
    const [email, setEmail] = useState(initialData.email || "");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(initialData.role || "");
    const [mobile, setMobile] = useState(initialData.mobile || "");
    const [status, setStatus] = useState(initialData.status || "active");
    const [showPassword, setShowPassword] = useState(false);
    const [roles, setRoles] = useState([]);
    const [loadingRoles, setLoadingRoles] = useState(true);
    const [rolesError, setRolesError] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setName(initialData.name || "");
        setEmail(initialData.email || "");
        setRole(initialData.role || "");
        setMobile(initialData.mobile || "");
        setStatus(initialData.status || "active");
    }, [initialData]);

    useEffect(() => {
        const fetchRoles = async () => {
            setLoadingRoles(true);
            setRolesError("");
            try {
                const token = localStorage.getItem("admin_token");
                const { ok, data } = await getRoles(token);
                if (ok && Array.isArray(data)) {
                    setRoles(data);
                } else {
                    setRolesError(data?.message || "Failed to fetch roles");
                }
            } catch (err) {
                setRolesError("Network error");
            }
            setLoadingRoles(false);
        };
        fetchRoles();
    }, []);

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!validateEmail(email.trim())) newErrors.email = "Invalid email format";
        if (!mobile.trim()) newErrors.mobile = "Mobile is required";
        else if (!validateMobile(mobile.trim())) newErrors.mobile = "Invalid mobile number";
        if (!initialData.name && !password) newErrors.password = "Password is required";
        else if (password && password.length < 6) newErrors.password = "Password must be at least 6 characters";
        if (!role) newErrors.role = "Role is required";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedName = capitalizeWords(name.trim());
        const formattedEmail = email.trim().toLowerCase();
        const formattedMobile = mobile.trim();
        const newErrors = validate();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;
        onSubmit({
            name: formattedName,
            email: formattedEmail,
            password: password || undefined,
            role,
            mobile: formattedMobile,
            status
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#101726] p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
            <h2 className="text-xl font-bold mb-4 text-center text-blue-400">{initialData.name ? "Edit User" : "Add User"}</h2>
            <div>
                <Label htmlFor="name" className="text-blue-300">Name</Label>
                <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-[#192132] text-white border-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <div className="text-red-400 text-sm mt-1">{errors.name}</div>}
            </div>
            <div>
                <Label htmlFor="email" className="text-blue-300">Email</Label>
                <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-[#192132] text-white border-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <div className="text-red-400 text-sm mt-1">{errors.email}</div>}
            </div>
            <div>
                <Label htmlFor="mobile" className="text-blue-300">Mobile</Label>
                <Input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    placeholder="Enter mobile number"
                    className="bg-[#192132] text-white border-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.mobile && <div className="text-red-400 text-sm mt-1">{errors.mobile}</div>}
            </div>
            <div>
                <Label htmlFor="password" className="text-blue-300">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={initialData.name ? "Leave blank to keep current password" : "Enter password"}
                        className="bg-[#192132] text-white border-none focus:ring-2 focus:ring-blue-500 pr-20"
                    />
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 text-xs text-blue-400 hover:text-white"
                        onClick={() => setShowPassword((v) => !v)}
                        tabIndex={-1}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </Button>
                </div>
                {errors.password && <div className="text-red-400 text-sm mt-1">{errors.password}</div>}
            </div>
            <div>
                <Label htmlFor="role" className="text-blue-300">Role</Label>
                {loadingRoles ? (
                    <div>Loading roles...</div>
                ) : rolesError ? (
                    <div className="text-red-400">{rolesError}</div>
                ) : (
                    <Select value={role} onValueChange={setRole} required>
                        <SelectTrigger id="role" className="bg-[#192132] text-white border-none focus:ring-2 focus:ring-blue-500">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#192132] text-white">
                            {roles.map((r) => (
                                <SelectItem key={r.id} value={r.id} className="hover:bg-blue-900">{r.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
                {errors.role && <div className="text-red-400 text-sm mt-1">{errors.role}</div>}
            </div>
            <div>
                <Label htmlFor="status" className="text-blue-300">Status</Label>
                <Select value={status} onValueChange={setStatus} required>
                    <SelectTrigger id="status" className="bg-[#192132] text-white border-none focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#192132] text-white">
                        <SelectItem value="active" className="hover:bg-blue-900">Active</SelectItem>
                        <SelectItem value="inactive" className="hover:bg-blue-900">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-center gap-4 mt-6">
                <Button type="submit" className="px-6 bg-blue-600 text-white hover:bg-blue-700 border-none">{initialData.name ? "Update" : "Add"} User</Button>
                <Button type="button" variant="outline" className="px-6 bg-[#22304a] text-blue-400 border-blue-400 hover:bg-blue-900 hover:text-white" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    );
}

export default UserForm; 