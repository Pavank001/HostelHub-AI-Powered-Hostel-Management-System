import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// Authentication
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Student Pages
import StudentDashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import EditProfile from "./pages/student/EditProfile";
import Room from "./pages/student/Room";
import StudentComplaints from "./pages/student/Complaints";
import Leave from "./pages/student/Leave";
import StudentFees from "./pages/student/Fees";
import StudentNotices from "./pages/student/Notices";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import Students from "./pages/admin/Students";
import Rooms from "./pages/admin/Rooms";
import AdminComplaints from "./pages/admin/Complaints";
import Leaves from "./pages/admin/Leaves";
import AdminFees from "./pages/admin/Fees";
import AdminNotices from "./pages/admin/Notices";

// AI Chat
import AIChat from "./components/ai/AIChat";


function StudentAIChat() {
  const location = useLocation();

  const studentPages = [
    "/student/dashboard",
    "/student/profile",
    "/student/profile/edit",
    "/student/room",
    "/student/complaints",
    "/student/leave",
    "/student/fees",
    "/student/notices",
  ];

  const isStudentPage = studentPages.includes(location.pathname);

  if (!isStudentPage) {
    return null;
  }

  return <AIChat />;
}


function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= STUDENT ================= */}

        <Route
          path="/student/dashboard"
          element={<StudentDashboard />}
        />

        <Route
          path="/student/profile"
          element={<Profile />}
        />

        <Route
          path="/student/profile/edit"
          element={<EditProfile />}
        />

        <Route
          path="/student/room"
          element={<Room />}
        />

        <Route
          path="/student/complaints"
          element={<StudentComplaints />}
        />

        <Route
          path="/student/leave"
          element={<Leave />}
        />

        <Route
          path="/student/fees"
          element={<StudentFees />}
        />

        <Route
          path="/student/notices"
          element={<StudentNotices />}
        />

        {/* ================= ADMIN ================= */}

        <Route
          path="/admin/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/admin/students"
          element={<Students />}
        />

        <Route
          path="/admin/rooms"
          element={<Rooms />}
        />

        <Route
          path="/admin/complaints"
          element={<AdminComplaints />}
        />

        <Route
          path="/admin/leaves"
          element={<Leaves />}
        />

        <Route
          path="/admin/fees"
          element={<AdminFees />}
        />

        <Route
          path="/admin/notices"
          element={<AdminNotices />}
        />

      </Routes>

      {/* AI only on student pages */}
      <StudentAIChat />

    </BrowserRouter>
  );
}

export default App;