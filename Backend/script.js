const express = require("express");
const applyMiddleware = require("./src/middleware/middleware");
const connectMongoDB = require("./src/config/mongodb");
const { connectPostgreSQL, pool } = require("./src/config/postgresql");
const routes = require("./src/routes");
require("dotenv").config();

const app = express();
port = process.env.PORT || 5000;

// --- Apply Middleware ---
applyMiddleware(app);

// --- Database Connections ---
connectMongoDB();
connectPostgreSQL();

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello From the Backend!");
});

// --- Server Start ---
app.listen(port || 5000, () => {
  console.log(`Server is running on port ${port}`);
});
