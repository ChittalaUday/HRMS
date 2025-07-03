const { pool } = require("../../config/postgresql");

//create slugify
const slugify = (str) => str && str.toLowerCase().replace(/\s+/g, '-');

const roles = {
    async getRoles(req, res) {
        try {
            const result = await pool.query("SELECT * FROM user_roles");
            res.json(result.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Error fetching roles" });
        }
    },
    async createRole(req, res) {
        try {
            const { name } = req.body;
            const slug = slugify(name);
            const result = await pool.query(
                "INSERT INTO user_roles (name, slug) VALUES ($1, $2) RETURNING *",
                [name, slug]
            );
            res.status(201).json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Error creating role" });
        }
    },
    async updateRole(req, res) {
        try {
            const { id, name } = req.body;
            const slug = slugify(name);
            const result = await pool.query(
                "UPDATE user_roles SET name = $1, slug = $2 WHERE id = $3 RETURNING *",
                [name, slug, id]
            );
            res.json(result.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Error updating role" });
        }
    },
    async deleteRole(req, res) {
        try {
            const { id } = req.params;
            const result = await pool.query(
                "DELETE FROM user_roles WHERE id = $1 RETURNING *",
                [id]
            );
            if (result.rowCount === 0) {
                return res.status(404).json({ message: "Role not found" });
            }
            res.json({ message: "Role deleted", role: result.rows[0] });
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ message: "Error deleting role" });
        }
    }
};

module.exports = roles;