import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaBed,
  FaClipboardList,
  FaCalendarAlt,
  FaMoneyBill,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2 transition ${
      isActive
        ? "bg-white text-blue-700 font-semibold"
        : "text-white hover:bg-blue-600"
    }`;

  return (
    <div className="flex h-screen w-64 flex-col bg-blue-700 text-white">

      {/* Logo */}
      <div className="p-5">
        <h1 className="text-3xl font-bold">HostelHub</h1>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 px-4">

        <NavLink to="/student/dashboard" className={linkClass}>
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/student/profile" className={linkClass}>
          <FaUser />
          <span>My Profile</span>
        </NavLink>

        <NavLink to="/student/room" className={linkClass}>
          <FaBed />
          <span>My Room</span>
        </NavLink>

        <NavLink to="/student/complaints" className={linkClass}>
          <FaClipboardList />
          <span>Complaints</span>
        </NavLink>

        <NavLink to="/student/leave" className={linkClass}>
          <FaCalendarAlt />
          <span>Leave</span>
        </NavLink>

        <NavLink to="/student/fees" className={linkClass}>
          <FaMoneyBill />
          <span>Fees</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-blue-500">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-red-200 transition hover:bg-red-500 hover:text-white"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>

    </div>
  );
}

export default Sidebar;