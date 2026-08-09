const User = require("../models/User");
const Room = require("../models/Room");

// =======================================
// Assign Room
// =======================================
exports.assignRoom = async (req, res) => {
  try {
    const { studentId, roomId } = req.body;

    if (!studentId || !roomId) {
      return res.status(400).json({
        success: false,
        message: "Student ID and Room ID are required",
      });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (student.role !== "student") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a student",
      });
    }

    if (student.room) {
      return res.status(400).json({
        success: false,
        message: "Student already has a room assigned",
      });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    if (room.occupiedBeds >= room.capacity) {
      return res.status(400).json({
        success: false,
        message: "Room is full",
      });
    }

    student.room = room._id;

    room.occupiedBeds += 1;

    if (room.occupiedBeds === room.capacity) {
      room.status = "Full";
    }

    await student.save();
    await room.save();

    res.status(200).json({
      success: true,
      message: "Room Assigned Successfully",
      student,
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================================
// Change Room
// =======================================
exports.changeRoom = async (req, res) => {
  try {
    const { studentId, newRoomId } = req.body;

    if (!studentId || !newRoomId) {
      return res.status(400).json({
        success: false,
        message: "Student ID and New Room ID are required",
      });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (!student.room) {
      return res.status(400).json({
        success: false,
        message: "Student has no room assigned",
      });
    }

    const oldRoom = await Room.findById(student.room);

    const newRoom = await Room.findById(newRoomId);

    if (!newRoom) {
      return res.status(404).json({
        success: false,
        message: "New room not found",
      });
    }

    if (newRoom.occupiedBeds >= newRoom.capacity) {
      return res.status(400).json({
        success: false,
        message: "New room is full",
      });
    }

    // Remove from old room
    oldRoom.occupiedBeds -= 1;
    oldRoom.status = "Available";

    // Add to new room
    newRoom.occupiedBeds += 1;

    if (newRoom.occupiedBeds === newRoom.capacity) {
      newRoom.status = "Full";
    }

    // Update student
    student.room = newRoom._id;

    await oldRoom.save();
    await newRoom.save();
    await student.save();

    res.status(200).json({
      success: true,
      message: "Room Changed Successfully",
      student,
      oldRoom,
      newRoom,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =======================================
// Remove Room
// =======================================
exports.removeRoom = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (!student.room) {
      return res.status(400).json({
        success: false,
        message: "Student has no room assigned",
      });
    }

    const room = await Room.findById(student.room);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    // Remove student from room
    room.occupiedBeds -= 1;

    if (room.occupiedBeds < room.capacity) {
      room.status = "Available";
    }

    student.room = null;

    await room.save();
    await student.save();

    res.status(200).json({
      success: true,
      message: "Student Removed From Room Successfully",
      student,
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyRoom = async (req, res) => {
  try {
    const student = await User.findById(req.user.id)
      .populate("room");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    if (!student.room) {
      return res.status(404).json({
        success: false,
        message: "No room assigned",
      });
    }

    res.status(200).json({
      success: true,
      room: student.room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};