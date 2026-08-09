const express = require("express");
const router = express.Router();

const { assignRoom,
    changeRoom,
    removeRoom,
    getMyRoom,

 } = require("../controllers/allocationController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.post(
  "/assign",
  protect,
  authorize("admin"),
  assignRoom
);
router.put(
  "/change-room",
  protect,
  authorize("admin"),
  changeRoom
);
router.delete(
  "/remove-room/:studentId",
  protect,
  authorize("admin"),
  removeRoom
);
router.get(
  "/my-room",
  protect,
  authorize("student"),
  getMyRoom
);
module.exports = router;