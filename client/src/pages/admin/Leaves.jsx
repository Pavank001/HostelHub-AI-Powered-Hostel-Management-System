import { useEffect, useState } from "react";
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

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const data = await getAllLeaves();
      setLeaves(data.leaves);
    } catch (error) {
      console.log(error);
      alert("Failed to load leaves");
    }
  };

  const handleStatusChange = (id) => {
    const leave = leaves.find((l) => l._id === id);
    setSelectedLeave(leave);
  };

  const handleSave = async (id, formData) => {
    try {
      await updateLeaveStatus(id, formData);

      alert("Leave Updated Successfully");

      setSelectedLeave(null);

      loadLeaves();
    } catch (error) {
      console.log(error);
      alert("Failed to update leave");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this leave request?")) return;

    try {
      await deleteLeave(id);

      alert("Leave Deleted Successfully");

      loadLeaves();
    } catch (error) {
      console.log(error);
      alert("Failed to delete leave");
    }
  };

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
          onClose={() => setSelectedLeave(null)}
          onSave={handleSave}
        />
      )}
    </AdminLayout>
  );
}

export default Leaves;