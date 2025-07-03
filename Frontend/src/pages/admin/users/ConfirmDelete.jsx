import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

function ConfirmDelete({ user, onConfirm, onCancel }) {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
        setLoading(true);
        await onConfirm();
        setLoading(false);
    };
    return (
        <div className="w-full">
            <DialogHeader>
                <DialogTitle>Delete User</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete <span className="font-semibold">{user.name}</span>?
                    <div className="mt-2 text-sm text-gray-600">Email: {user.email}</div>
                    <div className="text-sm text-gray-600">Role: {user.role_name || user.role}</div>
                    <div className="text-sm text-gray-600">Status: {user.status || "active"}</div>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 flex justify-center gap-4">
                <Button variant="destructive" onClick={handleDelete} disabled={loading}>{loading ? "Deleting..." : "Delete"}</Button>
                <Button variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>
            </DialogFooter>
        </div>
    );
}

export default ConfirmDelete; 