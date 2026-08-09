const Notice = require("../models/Notice");

// Create Notice
exports.createNotice = async (req, res) => {
  try {
    const notice = await Notice.create({
      ...req.body,
      postedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Notice Created Successfully",
      notice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Notices
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find()
      .populate("postedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notices.length,
      notices,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Notice
exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notice Updated Successfully",
      notice,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notice
exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice Not Found",
      });
    }

    await notice.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notice Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};