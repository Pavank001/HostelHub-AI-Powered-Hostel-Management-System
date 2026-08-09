import {
  FaTachometerAlt,
  FaUsers,
  FaBed,
  FaClipboardList,
  FaCalendarAlt,
  FaMoneyBill,
  FaSignOutAlt,
  FaBullhorn,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-4 transition ${
      isActive
        ? "bg-blue-700 text-white"
        : "text-white hover:bg-blue-600"
    }`;

  return (
    <aside className="w-72 min-h-screen bg-blue-700 text-white flex flex-col">

      {/* Logo */}
      <div className="text-4xl font-bold p-6 border-b border-blue-500">
        HostelHub
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-5">

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={navLinkClass}
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        {/* Notices */}
        <NavLink
          to="/admin/notices"
          className={navLinkClass}
        >
          <FaBullhorn />
          Notices
        </NavLink>

        {/* Students */}
        <NavLink
          to="/admin/students"
          className={navLinkClass}
        >
          <FaUsers />
          Students
        </NavLink>

        {/* Rooms */}
        <NavLink
          to="/admin/rooms"
          className={navLinkClass}
        >
          <FaBed />
          Rooms
        </NavLink>

        {/* Complaints */}
        <NavLink
          to="/admin/complaints"
          className={navLinkClass}
        >
          <FaClipboardList />
          Complaints
        </NavLink>

        {/* Leaves */}
        <NavLink
          to="/admin/leaves"
          className={navLinkClass}
        >
          <FaCalendarAlt />
          Leaves
        </NavLink>

        {/* Fees */}
        <NavLink
          to="/admin/fees"
          className={navLinkClass}
        >
          <FaMoneyBill />
          Fees
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="border-t border-blue-500 p-5">

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-white hover:text-red-300 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </aside>
  );
}

export default AdminSidebar;