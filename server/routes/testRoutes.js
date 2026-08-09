const express = require("express");
const router = express.Router();

const {
  adminDashboard,
  wardenDashboard,
  studentDashboard,
} = require("../controllers/testController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.get("/admin", protect, authorize("admin"), adminDashboard);

router.get("/warden", protect, authorize("warden"), wardenDashboard);

router.get("/student", protect, authorize("student"), studentDashboard);

module.exports = router;