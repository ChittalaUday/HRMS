const express = require("express");
const router = express.Router();
const { pool } = require("./config/postgresql");

router.get("/", (req, res) => {
  res.send("Server is running!");
});

router.get("/pg-time", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching PostgreSQL time:", err);
    res.status(500).send("Error fetching PostgreSQL time");
  }
});
router.get("/pg-users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching PostgreSQL users:", err);
    res.status(500).send("Error fetching PostgreSQL users");
  }
});

module.exports = router;
