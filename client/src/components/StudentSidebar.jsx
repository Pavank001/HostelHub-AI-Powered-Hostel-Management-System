import {
  FaHome,
  FaUser,
  FaBed,
  FaClipboardList,
  FaCalendarAlt,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function StudentSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="w-64 h-screen bg-blue-700 text-white flex flex-col">

      {/* Logo */}
      <div className="text-4xl font-bold p-6 border-b border-blue-500">
        HostelHub
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-6">

        <NavLink
          to="/student/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 mx-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink
          to="/student/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 mx-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaUser />
          My Profile
        </NavLink>

        <NavLink
          to="/student/room"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 mx-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaBed />
          My Room
        </NavLink>

        <NavLink
          to="/student/complaints"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 mx-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaClipboardList />
          Complaints
        </NavLink>

        <NavLink
          to="/student/leave"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 mx-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaCalendarAlt />
          Leave
        </NavLink>

        <NavLink
          to="/student/fees"
          className={({ isActive }) =>
            `flex items-center gap-3 px-6 py-4 mx-3 rounded-lg transition ${
              isActive
                ? "bg-white text-blue-700 font-semibold"
                : "hover:bg-blue-600"
            }`
          }
        >
          <FaMoneyBill />
          Fees
        </NavLink>
          <NavLink
  to="/student/notices"
  className="flex items-center gap-3 px-6 py-4 hover:bg-blue-600"
>
  <FaBullhorn />
  Notices
</NavLink>
      </nav>

      {/* Logout */}
      <div className="border-t border-blue-500 p-5">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

    </div>
  );
}

export default StudentSidebar;