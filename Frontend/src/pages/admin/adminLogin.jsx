import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../../api/admin/users";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, pass);
        setErr("");
        try {
            const { ok, data } = await adminLogin({ email, password: pass });
            if (!ok) {
                setErr(data.error || "Login failed");
                return;
            }
            localStorage.setItem("admin_token", data.token);
            navigate("/admin/dashboard/home");
        } catch (error) {
            console.log(error);
            setErr("Network error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter admin Email"
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Enter admin Password"
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {err && <p className="text-red-500 text-sm">{err}</p>}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">Login as Admin</button>
                </form>
            </div>
        </div>
    );
}

export default AdminLogin; 