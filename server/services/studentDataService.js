const User = require("../models/User");
const Fee = require("../models/Fee");
const Notice = require("../models/Notice");

const getStudentContext = async (studentId) => {
  // Get student details with room information
  const student = await User.findById(studentId).populate("room");

  // Get pending fees
  const pendingFees = await Fee.find({
    student: studentId,
    status: "Pending",
  });

  // Get latest 5 notices
  const notices = await Notice.find()
    .sort({ createdAt: -1 })
    .limit(5);

  return {
    student,
    pendingFees,
    notices,
  };
};

module.exports = {
  getStudentContext,
};