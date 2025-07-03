import { useState, useEffect, useRef } from "react";
import UserList from "./UserList";
import UserForm from "./UserForm";
import ConfirmDelete from "./ConfirmDelete";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../../api/admin/users";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, FileDown } from "lucide-react";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]);
    const searchInputRef = useRef(null);

    const token = localStorage.getItem("admin_token");

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (!search) {
            setFilteredUsers(users);
        } else {
            const lower = search.toLowerCase();
            setFilteredUsers(
                users.filter(
                    (u) =>
                        u.name?.toLowerCase().includes(lower) ||
                        u.email?.toLowerCase().includes(lower) ||
                        u.role_name?.toLowerCase().includes(lower) ||
                        u.mobile?.includes(lower)
                )
            );
        }
    }, [search, users]);

    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError("");
        try {
            const { ok, data } = await getAllUsers(token);
            if (ok) setUsers(data.users || []);
            else setError(data.error || "Failed to fetch users");
        } catch (err) {
            setError("Network error");
        }
        setLoading(false);
    };

    const handleAdd = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDelete = (userId) => {
        setDeletingUser(users.find((u) => u.id === userId));
    };

    const handleFormSubmit = async (user) => {
        setLoading(true);
        setError("");
        try {
            if (editingUser) {
                const { ok, data } = await updateUser(editingUser.id, user, token);
                if (ok) fetchUsers();
                else setError(data.error || "Failed to update user");
            } else {
                const { ok, data } = await createUser(user, token);
                if (ok) fetchUsers();
                else setError(data.error || "Failed to create user");
            }
        } catch (err) {
            setError("Network error");
        }
        setShowForm(false);
        setEditingUser(null);
        setLoading(false);
    };

    const handleDeleteConfirm = async () => {
        setLoading(true);
        setError("");
        try {
            const { ok, data } = await deleteUser(deletingUser.id, token);
            if (ok) fetchUsers();
            else setError(data.error || "Failed to delete user");
        } catch (err) {
            setError("Network error");
        }
        setDeletingUser(null);
        setLoading(false);
    };

    // CSV Export
    const handleExportCSV = () => {
        const headers = ["Name", "Email", "Mobile", "Role", "Status"];
        const rows = filteredUsers.map(u => [u.name, u.email, u.mobile, u.role_name, u.status]);
        const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "users.csv";
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-6xl mx-auto mt-8">
            <div className="bg-[#101726] rounded-2xl shadow-lg p-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-white">Manage Users</h2>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleExportCSV} size="sm" className="flex items-center bg-[#192132] text-blue-400 border-blue-400 hover:bg-blue-900 hover:text-white"><FileDown className="w-4 h-4 mr-1" /> Export CSV</Button>
                        <Button onClick={handleAdd} size="sm" className="flex items-center bg-blue-600 text-white hover:bg-blue-700"><Plus className="w-4 h-4 mr-1" /> Add User</Button>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-2">
                    <Input
                        ref={searchInputRef}
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name, email, role, mobile (Ctrl+K)"
                        className="w-full md:w-64 bg-[#192132] text-white border-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button variant="ghost" onClick={() => setSearch("")} className="text-blue-400 hover:text-white">Clear</Button>
                </div>
                {error && <div className="text-red-400 mb-2">{error}</div>}
                {loading ? (
                    <div className="text-white">Loading...</div>
                ) : (
                    <UserList users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
                )}
                <Dialog open={showForm} onOpenChange={setShowForm}>
                    <DialogContent className="max-w-lg p-0 bg-[#101726] text-white rounded-xl">
                        {showForm && (
                            <UserForm
                                initialData={editingUser || {}}
                                onSubmit={handleFormSubmit}
                                onCancel={() => { setShowForm(false); setEditingUser(null); }}
                            />
                        )}
                    </DialogContent>
                </Dialog>
                <Dialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
                    <DialogContent className="max-w-md p-0 bg-[#101726] text-white rounded-xl">
                        {deletingUser && (
                            <ConfirmDelete
                                user={deletingUser}
                                onConfirm={handleDeleteConfirm}
                                onCancel={() => setDeletingUser(null)}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}

export default ManageUsers; 