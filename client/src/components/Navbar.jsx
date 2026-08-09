import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex justify-between items-center bg-white text-gray-800 shadow px-6 py-4">

      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome, {user?.name || "Student"} 👋
        </h1>

        <p className="text-gray-500">
          Hostel Management System
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <FaBell
          className="text-2xl text-gray-600 cursor-pointer"
        />

        {/* User */}
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-3xl text-blue-600" />

          <span className="font-semibold">
            {user?.name || "Student"}
          </span>
        </div>

      </div>
    </div>
  );
}

export default Navbar;