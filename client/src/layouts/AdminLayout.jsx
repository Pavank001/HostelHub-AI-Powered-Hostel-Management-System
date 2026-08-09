import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">

        {/* Navbar */}
        <AdminNavbar />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </div>

    </div>
  );
}

export default AdminLayout;