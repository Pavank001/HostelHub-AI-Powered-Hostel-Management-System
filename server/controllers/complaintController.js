const Complaint = require("../models/Complaint");


// Student creates complaint
exports.createComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.create({
      student: req.user.id,
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
    });

    res.status(201).json({
      success: true,
      message: "Complaint Submitted Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Student -> My Complaints
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({
      student: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Admin -> All Complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find()
      .populate("student", "name email room")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Admin -> Update Status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    complaint.status = req.body.status;

    await complaint.save();

    res.status(200).json({
      success: true,
      message: "Complaint Updated Successfully",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Admin -> Delete Complaint
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    await complaint.deleteOne();

    res.status(200).json({
      success: true,
      message: "Complaint Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};