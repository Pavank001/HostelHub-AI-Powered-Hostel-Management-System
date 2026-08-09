const Room = require("../models/Room");

// Create Room
exports.createRoom = async (req, res) => {
  try {
    const {
      roomNumber,
      floor,
      hostelBlock,
      roomType,
      capacity,
    } = req.body;

    // Check if room already exists
    const existingRoom = await Room.findOne({ roomNumber });

    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: "Room already exists",
      });
    }

    const room = await Room.create({
      roomNumber,
      floor,
      hostelBlock,
      roomType,
      capacity,
    });

    res.status(201).json({
      success: true,
      message: "Room Created Successfully",
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Room
exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAvailableRooms = async (req, res) => {
  try {
    const rooms = await Room.find({
      status: "Available",
      $expr: {
        $lt: ["$occupiedBeds", "$capacity"],
      },
    }).sort({ roomNumber: 1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Update Room
exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,          // Return updated document
        runValidators: true // Apply schema validations
      }
    );

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room Updated Successfully",
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Room
exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Room Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};