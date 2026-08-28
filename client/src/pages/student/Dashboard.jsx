import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import DashboardCard from "../../components/DashboardCard";
import NoticeBoard from "../../components/NoticeBoard";
import { getStudentDashboard } from "../../services/dashboardService";
import AIChat from "../../components/ai/AIChat";
import toast from "react-hot-toast";
function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getStudentDashboard();
      setStats(data.stats);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load dashboard");
    }
  };

  if (!stats) {
    return (
      <StudentLayout>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-600 text-lg">
            Loading...
          </p>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 text-gray-900">

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Student Dashboard
          </h1>

          <p className="text-gray-500 mt-1">
            Welcome to your HostelHub dashboard.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-8">

          <DashboardCard
            title="Complaints"
            value={stats.complaints || 0}
            color="bg-blue-600"
          />

          <DashboardCard
            title="Leaves"
            value={stats.leaves || 0}
            color="bg-green-600"
          />

          <DashboardCard
            title="Pending Fees"
            value={stats.pendingFees || 0}
            color="bg-red-600"
          />

          <DashboardCard
            title="Room Number"
            value={
              stats.room?.roomNumber || "Not Assigned"
            }
            color="bg-purple-600"
          />

        </div>

        {/* Notice Board */}
        <div className="mb-8">
          <NoticeBoard />
        </div>

        {/* AI Chat */}
        <AIChat />

      </div>
    </StudentLayout>
  );
}

export default Dashboard;