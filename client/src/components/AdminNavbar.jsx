function AdminNavbar() {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>

        <p className="text-gray-500">
          Hostel Management System
        </p>
      </div>

      <div className="text-lg font-semibold text-gray-900">
        Admin
      </div>

    </div>
  );
}

export default AdminNavbar;