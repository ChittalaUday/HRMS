import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

function UserList({ users, onEdit, onDelete }) {
    console.log("UserList users prop:", users); // Debugging line
    const [sortBy, setSortBy] = useState("name");
    const [sortDir, setSortDir] = useState("asc");

    const sortedUsers = [...users].sort((a, b) => {
        let valA = a[sortBy] || "";
        let valB = b[sortBy] || "";
        if (typeof valA === "string") valA = valA.toLowerCase();
        if (typeof valB === "string") valB = valB.toLowerCase();
        if (valA < valB) return sortDir === "asc" ? -1 : 1;
        if (valA > valB) return sortDir === "asc" ? 1 : -1;
        return 0;
    });

    const handleSort = (col) => {
        if (sortBy === col) setSortDir(sortDir === "asc" ? "desc" : "asc");
        else {
            setSortBy(col);
            setSortDir("asc");
        }
    };

    return (
        <div className="overflow-x-auto rounded-2xl bg-[#192132] shadow-lg">
            <Table className="min-w-full text-white">
                <TableHeader>
                    <TableRow className="bg-[#101726]">
                        <TableHead className="text-center cursor-pointer text-blue-400" onClick={() => handleSort("name")}>Name</TableHead>
                        <TableHead className="text-center cursor-pointer text-blue-400" onClick={() => handleSort("email")}>Email</TableHead>
                        <TableHead className="text-center cursor-pointer text-blue-400" onClick={() => handleSort("role_name")}>Role</TableHead>
                        <TableHead className="text-center cursor-pointer text-blue-400" onClick={() => handleSort("status")}>Status</TableHead>
                        <TableHead className="text-center text-blue-400">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedUsers.map((user) => (
                        <TableRow key={user.id} className="hover:bg-[#22304a] transition-colors cursor-pointer">
                            <TableCell className="text-center font-medium">{user.name}</TableCell>
                            <TableCell className="text-center">{user.email?.toLowerCase()}</TableCell>
                            <TableCell className="text-center">{user.role_name || user.role}</TableCell>
                            <TableCell className="text-center">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.status === 'active' ? 'bg-green-700 text-green-200' : 'bg-gray-700 text-gray-300'}`}>{user.status || "active"}</span>
                            </TableCell>
                            <TableCell className="text-center">
                                <Button variant="outline" size="sm" className="mr-2 bg-[#22304a] text-blue-400 border-blue-400 hover:bg-blue-900 hover:text-white" onClick={e => { e.stopPropagation(); onEdit(user); }}>Edit</Button>
                                <Button variant="destructive" size="sm" className="bg-red-700 hover:bg-red-800" onClick={e => { e.stopPropagation(); onDelete(user.id); }}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default UserList; 