const express = require("express");
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} = require("../controllers/complaintController");

const { protect, authorize } = require("../middleware/authMiddleware");

// ======================
// Student Routes
// ======================

// Create Complaint
router.post(
  "/",
  protect,
  authorize("student"),
  createComplaint
);

// Get My Complaints
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyComplaints
);

// ======================
// Admin Routes
// ======================

// Get All Complaints
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllComplaints
);

// Update Complaint Status
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateComplaintStatus
);

// Delete Complaint
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteComplaint
);

module.exports = router;