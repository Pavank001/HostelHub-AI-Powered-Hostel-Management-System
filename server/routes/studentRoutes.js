const express = require("express");

const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getProfile,
  updateProfile,
} = require("../controllers/studentController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// =======================================
// Student Profile Routes
// =======================================

router.get(
  "/profile",
  protect,
  authorize("student"),
  getProfile
);

router.put(
  "/profile",
  protect,
  authorize("student"),
  updateProfile
);

// =======================================
// Admin Student Management
// =======================================

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllStudents
);

router.get(
  "/:id",
  protect,
  authorize("admin"),
  getStudentById
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateStudent
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteStudent
);

module.exports = router;