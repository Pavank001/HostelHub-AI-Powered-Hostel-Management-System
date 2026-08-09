exports.adminDashboard = (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin Dashboard",
  });
};

exports.wardenDashboard = (req, res) => {
  res.json({
    success: true,
    message: "Welcome Warden Dashboard",
  });
};

exports.studentDashboard = (req, res) => {
  res.json({
    success: true,
    message: "Welcome Student Dashboard",
  });
};