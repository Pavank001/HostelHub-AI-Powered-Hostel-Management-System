const User = require("../models/User");
const Room = require("../models/Room");
const Complaint = require("../models/Complaint");
const Leave = require("../models/Leave");
const Fee = require("../models/Fee");

exports.getAdminDashboard = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({
      role: "student",
    });

    const totalRooms = await Room.countDocuments();

    const availableRooms = await Room.countDocuments({
      status: "Available",
    });

    const pendingComplaints =
      await Complaint.countDocuments({
        status: "Pending",
      });

    const pendingLeaves =
      await Leave.countDocuments({
        status: "Pending",
      });

    const pendingFees =
      await Fee.countDocuments({
        status: "Pending",
      });

    res.status(200).json({
      success: true,
      stats: {
        totalStudents,
        totalRooms,
        availableRooms,
        pendingComplaints,
        pendingLeaves,
        pendingFees,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getStudentDashboard = async (req, res) => {
  try {
    const complaints = await Complaint.countDocuments({
      student: req.user.id,
    });

    const leaves = await Leave.countDocuments({
      student: req.user.id,
    });

    const pendingFees = await Fee.countDocuments({
      student: req.user.id,
      status: "Pending",
    });

    const student = await User.findById(req.user.id)
      .populate("room");

    res.status(200).json({
      success: true,
      stats: {
        complaints,
        leaves,
        pendingFees,
        room: student.room,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};