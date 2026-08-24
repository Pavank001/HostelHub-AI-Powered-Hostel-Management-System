const express = require("express");

const router = express.Router();

const {
  createFee,
  getAllFees,
  getMyFees,
  updateFee,
  deleteFee,
  sendPaymentNote,
  updateFeeStatus,
} = require("../controllers/feeController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Admin - Create fee
router.post(
  "/",
  protect,
  authorize("admin"),
  createFee
);

// Admin - Get all fees
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllFees
);

// Student - Get own fees
router.get(
  "/my",
  protect,
  authorize("student"),
  getMyFees
);

// Student - Send payment note
router.put(
  "/:id/payment-note",
  protect,
  authorize("student"),
  sendPaymentNote
);

// Admin - Update fee
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateFee
);

// Admin - Update fee status
router.put(
  "/:id/status",
  protect,
  authorize("admin"),
  updateFeeStatus
);

// Admin - Delete fee
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteFee
);

module.exports = router;