const express = require("express");
const router = express.Router();
const rolesController = require("../../controllers/admin/rolesController");
const auth = require("../../middleware/auth");

router.use(auth.authenticateToken);
router.get("/", rolesController.getRoles);
router.put("/:id", rolesController.updateRole);
router.post("/", rolesController.createRole);
router.delete("/:id", rolesController.deleteRole);

module.exports = router; 