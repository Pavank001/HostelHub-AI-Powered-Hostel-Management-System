import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import StatsGrid from "../../components/StatsGrid";
import RecentActivity from "../../components/RecentActivity";

import { getAdminDashboard } from "../../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getAdminDashboard();

      console.log("DASHBOARD DATA:", data);

      setStats(data.stats);
    } catch (error) {
      console.log("DASHBOARD ERROR:", error);
      alert("Failed to load dashboard");
    }
  };

  if (!stats) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">
          Loading...
        </div>
      </AdminLayout>
    );
  }

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