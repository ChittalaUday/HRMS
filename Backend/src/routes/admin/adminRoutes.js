const express = require("express");
const router = express.Router();
const adminLogin = require("../../controllers/admin/adminLogin");
const auth = require("../../middleware/auth");

router.post("/login", adminLogin.login);
router.use(auth.authenticateToken);
router.post("/register", adminLogin.register);

module.exports = router; 