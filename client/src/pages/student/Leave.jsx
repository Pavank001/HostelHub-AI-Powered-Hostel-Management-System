import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StudentLayout from "../../layouts/StudentLayout";
import LeaveForm from "../../components/LeaveForm";
import LeaveCard from "../../components/LeaveCard";

import {
  applyLeave,
  getMyLeaves,
} from "../../services/leaveService";

function Leave() {
  const [leaves, setLeaves] = useState([]);

  // =======================================
  // Load Leaves
  // =======================================

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const data = await getMyLeaves();

      setLeaves(data.leaves || []);
    } catch (error) {
      console.log("LOAD LEAVES ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load leaves"
      );
    }
  };

  // =======================================
  // Apply Leave
  // =======================================

  const handleSubmit = async (formData) => {
    try {
      await applyLeave(formData);

      // Success toast instead of browser popup
      toast.success("Leave Applied Successfully");

      // Reload leave requests
      await loadLeaves();

    } catch (error) {
      console.log("APPLY LEAVE ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to apply leave"
      );

      // Send error back to LeaveForm
      throw error;
    }
  };

  return (
    <StudentLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Leave Requests
      </h1>

      <LeaveForm
        onSubmit={handleSubmit}
      />

      <div className="grid md:grid-cols-2 gap-5">

        {leaves.map((leave) => (
          <LeaveCard
            key={leave._id}
            leave={leave}
          />
        ))}

      </div>

    </StudentLayout>
  );
}

export default Leave;