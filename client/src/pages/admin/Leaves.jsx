import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import LeaveTable from "../../components/LeaveTable";
import LeaveStatusModal from "../../components/LeaveStatusModal";

import {
  getAllLeaves,
  updateLeaveStatus,
  deleteLeave,
} from "../../services/leaveService";

function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState(null);

  // =======================================
  // Load Leaves
  // =======================================

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const data = await getAllLeaves();

      setLeaves(data.leaves || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load leaves"
      );
    }
  };

  // =======================================
  // Status Change
  // =======================================

  const handleStatusChange = (id) => {
    const leave = leaves.find(
      (l) => l._id === id
    );

    setSelectedLeave(leave);
  };

  // =======================================
  // Update Leave
  // =======================================

  const handleSave = async (id, formData) => {
    try {
      await updateLeaveStatus(
        id,
        formData
      );

      toast.success(
        "Leave Updated Successfully"
      );

      setSelectedLeave(null);

      loadLeaves();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update leave"
      );
    }
  };

  // =======================================
  // Delete Leave
  // =======================================

 const handleDelete = async (id) => {
  try {
    await deleteLeave(id);

    toast.success("Leave Deleted Successfully");

    await loadLeaves();
  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
        "Failed to delete leave"
    );
  }
};

  // =======================================
  // UI
  // =======================================

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Leave Management
      </h1>

      <LeaveTable
        leaves={leaves}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {selectedLeave && (
        <LeaveStatusModal
          leave={selectedLeave}
          onClose={() =>
            setSelectedLeave(null)
          }
          onSave={handleSave}
        />
      )}

    </AdminLayout>
  );
}

export default Leaves;