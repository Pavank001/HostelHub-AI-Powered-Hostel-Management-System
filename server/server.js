require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const roomRoutes = require("./routes/roomRoutes");
const studentRoutes = require("./routes/studentRoutes");
const allocationRoutes = require("./routes/allocationRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const feeRoutes = require("./routes/feeRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

connectDB();

// =======================================
// CORS
// =======================================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://hostelhub-ai-powered-hostel-management-qtf7.onrender.com",
    ],
    credentials: true,
  })
);

// =======================================
// Middleware
// =======================================

app.use(express.json());

// =======================================
// Routes
// =======================================

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/allocation", allocationRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/fees", feeRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notices", noticeRoutes);
app.use("/api/ai", aiRoutes);

// =======================================
// Test Route
// =======================================

app.get("/", (req, res) => {
  res.send("HostelHub Backend Running");
});

// =======================================
// Server
// =======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});