const User = require("../models/User");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" })
      .populate("room")
      .select("-password");

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getStudentById = async (req, res) => {
  try {
    const student = await User.findById(req.params.id)
      .populate("room")
      .select("-password");

    if (!student || student.role !== "student") {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Update fields
    student.name = req.body.name || student.name;
    student.email = req.body.email || student.email;
    student.phone = req.body.phone || student.phone;

    await student.save();

    const updatedStudent = await User.findById(req.params.id)
      .select("-password")
      .populate("room");

    res.status(200).json({
      success: true,
      message: "Student Updated Successfully",
      student: updatedStudent,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteStudent = async (req, res) => {
  try {
    const student = await User.findById(req.params.id);

    if (!student || student.role !== "student") {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Student Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id)
      .populate("room")
      .select("-password");

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const student = await User.findById(req.user.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    student.name = req.body.name || student.name;
    student.phone = req.body.phone || student.phone;

    await student.save();

    const updatedStudent = await User.findById(req.user.id)
      .populate("room")
      .select("-password");

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      student: updatedStudent,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};