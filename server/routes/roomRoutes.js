const express = require("express");

const router = express.Router();

const {
  createRoom,
  getAllRooms,
  getAvailableRooms,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// Create Room
router.post(
  "/",
  protect,
  authorize("admin"),
  createRoom
);

// Get All Rooms
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllRooms
);

// Get Available Rooms
router.get(
  "/available",
  protect,
  authorize("admin"),
  getAvailableRooms
);

// Update Room
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateRoom
);

// Delete Room
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteRoom
);

module.exports = router;