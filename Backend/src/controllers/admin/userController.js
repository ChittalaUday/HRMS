const { user } = require("../../config/db");
const { pool } = require("../../config/postgresql");
const bcrypt = require("bcrypt");
const userController = {
    async getAllUsers(req, res) {
        try {
            const result = await pool.query(`
                SELECT users.*, user_roles.name as role_name, user_roles.slug as role_slug
                FROM users
                JOIN user_roles ON users.role = user_roles.id
            `);
            const users = result.rows;
            res.json({ ok: true, message: "Users fetched successfully", users: users });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error fetching users" });
        }
    },
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query(`
                SELECT users.*, user_roles.name as role_name, user_roles.slug as role_slug
                FROM users
                JOIN user_roles ON users.role = user_roles.id
                WHERE users.id = $1
            `, [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error fetching user" });
        }
    },
    async createUser(req, res) {
        try {
            const { name, email, mobile, password, role, status } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const insertResult = await pool.query(
                "INSERT INTO users (name, email, mobile, password, role, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [name, email, mobile, hashedPassword, role, status || "active"]
            );
            const userId = insertResult.rows[0].id;
            const result = await pool.query(`
                SELECT users.*, user_roles.name as role_name, user_roles.slug as role_slug
                FROM users
                JOIN user_roles ON users.role = user_roles.id
                WHERE users.id = $1
            `, [userId]);
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error creating user" });
        }
    },
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, mobile, password, role, status } = req.body;
            let updateQuery, params;
            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updateQuery = "UPDATE users SET name = $1, email = $2, mobile = $3, password = $4, role = $5, status = $6 WHERE id = $7 RETURNING *";
                params = [name, email, mobile, hashedPassword, role, status || "active", id];
            } else {
                updateQuery = "UPDATE users SET name = $1, email = $2, mobile = $3, role = $4, status = $5 WHERE id = $6 RETURNING *";
                params = [name, email, mobile, role, status || "active", id];
            }
            const updateResult = await pool.query(updateQuery, params);
            if (updateResult.rows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            const result = await pool.query(`
                SELECT users.*, user_roles.name as role_name, user_roles.slug as role_slug
                FROM users
                JOIN user_roles ON users.role = user_roles.id
                WHERE users.id = $1
            `, [id]);
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error updating user" });
        }
    },
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({ message: "User deleted successfully" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error deleting user" });
        }
    }
};

module.exports = userController;
