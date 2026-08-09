const express = require("express");
const router = express.Router();

const {
  createNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Admin
router.post(
  "/",
  protect,
  authorize("admin"),
  createNotice
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateNotice
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteNotice
);

// Student + Admin
router.get(
  "/",
  protect,
  getAllNotices
);

module.exports = router;