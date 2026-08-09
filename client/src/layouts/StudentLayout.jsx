import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function StudentLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}

export default StudentLayout;