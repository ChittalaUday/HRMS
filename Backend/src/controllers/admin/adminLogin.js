const { pool } = require("../../config/postgresql");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../../middleware/auth");

const adminLogin = {
    async login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        try {
            const result = await pool.query(
                "SELECT * FROM users WHERE email = $1",
                [email]
            );
            console.log(result.rows);
            if (result.rows.length === 0) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const admin = result.rows[0];
            const match = await bcrypt.compare(password, admin.password);
            if (!match) {
                return res.status(401).json({ error: "Invalid credentials" });
            }
            const token = generateAccessToken({ id: admin.id, email: admin.email, role: "admin" });
            res.json({ token });
        } catch (err) {
            console.error("Admin login error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    },
    async register(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await pool.query(
                "INSERT INTO users (email, password,role) VALUES ($1, $2, $3) RETURNING *",
                [email, hashedPassword, 1]
            );
            res.json({ message: "Admin registered successfully" });
        } catch (err) {
            console.error("Admin registration error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
module.exports = adminLogin;