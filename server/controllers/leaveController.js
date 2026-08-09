const Leave = require("../models/Leave");

exports.applyLeave = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const leave = await Leave.create({
      student: req.user.id,
      fromDate,
      toDate,
      reason,
    });

    res.status(201).json({
      success: true,
      message: "Leave Applied Successfully",
      leave,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate("student", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: leaves.length,
      leaves,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Only allow valid status values
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be Approved or Rejected",
      });
    }

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    leave.status = status;

    await leave.save();

    res.status(200).json({
      success: true,
      message: `Leave ${status} Successfully`,
      leave,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findById(id);

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave request not found",
      });
    }

    await leave.deleteOne();

    res.status(200).json({
      success: true,
      message: "Leave Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};