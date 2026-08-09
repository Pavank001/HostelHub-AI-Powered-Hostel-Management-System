const express = require("express");
const router = express.Router();

const {
  createFee,
  getAllFees,
  getMyFees,
  updateFee,
  deleteFee,
} = require("../controllers/feeController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  authorize("admin"),
  createFee
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllFees
);

router.get(
  "/my",
  protect,
  authorize("student"),
  getMyFees
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateFee
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteFee
);

module.exports = router;