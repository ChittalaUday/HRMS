const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Niruthi",
  password: "Uday-015",
  port: 5432,
});

const connectPostgreSQL = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("PostgreSQL DB is Connected:", res.rows[0]);
  } catch (err) {
    console.error("PostgreSQL DB Connection error", err.stack);
    process.exit(1); // Exit process with failure
  }
};

module.exports = {
  pool,
  connectPostgreSQL,
};
