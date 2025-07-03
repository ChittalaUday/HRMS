const express = require("express");
const router = express.Router();

const adminRoutes = require("./admin/adminRoutes");
const userRoutes = require("./admin/userRoutes");
const roleRoutes = require("./admin/roleRoutes");
// const clientRoutes = require("./client/clientRoutes"); // Uncomment when client routes are added

router.use("/admin", adminRoutes);
router.use("/admin/users", userRoutes);
router.use("/admin/roles", roleRoutes);
// router.use("/client", clientRoutes); // Uncomment when client routes are added

router.get("/", (req, res) => {
  res.send("Server is running!");
});

module.exports = router;
