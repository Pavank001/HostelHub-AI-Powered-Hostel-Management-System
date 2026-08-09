const Fee = require("../models/Fee");
const User = require("../models/User");

// =======================================
// Create Fee - Admin
// =======================================
exports.createFee = async (req, res) => {
  try {
    const {
      student,
      feeType,
      amount,
      paidAmount = 0,
      dueDate,
    } = req.body;

    // Validate required fields
    if (!student || !feeType || amount === undefined || !dueDate) {
      return res.status(400).json({
        success: false,
        message:
          "Student, fee type, amount and due date are required",
      });
    }

    // Check student
    const existingStudent = await User.findOne({
      _id: student,
      role: "student",
    });

    if (!existingStudent) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Validate amount
    if (Number(amount) < 0) {
      return res.status(400).json({
        success: false,
        message: "Amount cannot be negative",
      });
    }

    // Validate paid amount
    if (Number(paidAmount) < 0) {
      return res.status(400).json({
        success: false,
        message: "Paid amount cannot be negative",
      });
    }

    // Paid amount cannot be greater than total amount
    if (Number(paidAmount) > Number(amount)) {
      return res.status(400).json({
        success: false,
        message:
          "Paid amount cannot be greater than total amount",
      });
    }

    // Determine status
    let status = "Pending";

    if (Number(paidAmount) === Number(amount)) {
      status = "Paid";
    } else if (Number(paidAmount) > 0) {
      status = "Partially Paid";
    }

    const fee = await Fee.create({
      student,
      feeType,
      amount: Number(amount),
      paidAmount: Number(paidAmount),
      dueDate,
      status,
    });

    const populatedFee = await Fee.findById(fee._id).populate(
      "student",
      "name email phone"
    );

    res.status(201).json({
      success: true,
      message: "Fee Added Successfully",
      fee: populatedFee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get All Fees - Admin
// =======================================
exports.getAllFees = async (req, res) => {
  try {
    const fees = await Fee.find()
      .populate("student", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: fees.length,
      fees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Get My Fees - Student
// =======================================
exports.getMyFees = async (req, res) => {
  try {
    const fees = await Fee.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    // Calculate summary
    const totalAmount = fees.reduce(
      (total, fee) => total + fee.amount,
      0
    );

    const paidAmount = fees.reduce(
      (total, fee) => total + fee.paidAmount,
      0
    );

    const pendingAmount = totalAmount - paidAmount;

    res.status(200).json({
      success: true,
      count: fees.length,

      summary: {
        totalAmount,
        paidAmount,
        pendingAmount,
      },

      fees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Update Fee - Admin
// =======================================
exports.updateFee = async (req, res) => {
  try {
    console.log("UPDATE FEE REQUEST");
    console.log("Fee ID:", req.params.id);
    console.log("Request Body:", req.body);

    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    fee.feeType = req.body.feeType;
    fee.amount = Number(req.body.amount);
    fee.dueDate = req.body.dueDate;
    fee.status = req.body.status;

    const updatedFee = await fee.save();

    console.log("UPDATED FEE:", updatedFee);

    res.status(200).json({
      success: true,
      message: "Fee Updated Successfully",
      fee: updatedFee,
    });

  } catch (error) {
    console.log("UPDATE FEE ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =======================================
// Delete Fee - Admin
// =======================================
exports.deleteFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);

    if (!fee) {
      return res.status(404).json({
        success: false,
        message: "Fee not found",
      });
    }

    await Fee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Fee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};