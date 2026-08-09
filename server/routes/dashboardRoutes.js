const express = require("express");
const router = express.Router();

const {
  getAdminDashboard,
  getStudentDashboard,
} = require("../controllers/dashboardController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Admin Dashboard
router.get(
  "/admin",
  protect,
  authorize("admin"),
  getAdminDashboard
);

// Student Dashboard
router.get(
  "/student",
  protect,
  authorize("student"),
  getStudentDashboard
);

module.exports = router;