const express = require("express");
const router = express.Router();

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  updateLeaveStatus,
  deleteLeave,
} = require("../controllers/leaveController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/apply", protect, authorize("student"), applyLeave);

router.get("/my", protect, authorize("student"), getMyLeaves);

router.get("/", protect, authorize("admin"), getAllLeaves);

router.put("/:id", protect, authorize("admin"), updateLeaveStatus);

router.delete("/:id", protect, authorize("admin"), deleteLeave);

module.exports = router;