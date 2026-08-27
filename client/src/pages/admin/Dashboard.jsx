import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import StatsGrid from "../../components/StatsGrid";
import RecentActivity from "../../components/RecentActivity";

import { getAdminDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  // =======================================
  // Load Dashboard
  // =======================================

  const loadDashboard = async () => {
    try {
      const data = await getAdminDashboard();

      console.log("DASHBOARD DATA:", data);

      setStats(data.stats);
    } catch (error) {
      console.log("DASHBOARD ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load dashboard"
      );
    }
  };

  // =======================================
  // Loading
  // =======================================

  if (!stats) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          Loading...
        </div>
      </AdminLayout>
    );
  }

  // =======================================
  // UI
  // =======================================

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <StatsGrid stats={stats} />

      <RecentActivity />

    </AdminLayout>
  );
}

export default Dashboard;