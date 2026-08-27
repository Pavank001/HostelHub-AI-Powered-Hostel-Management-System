import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import ComplaintTable from "../../components/ComplaintTable";
import ComplaintStatusModal from "../../components/ComplaintStatusModal";

import {
  getAllComplaints,
  updateComplaintStatus,
  deleteComplaint,
} from "../../services/complaintService";

function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] =
    useState(null);

  // =======================================
  // Load Complaints
  // =======================================

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await getAllComplaints();

      setComplaints(data.complaints || []);
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to load complaints"
      );
    }
  };

  // =======================================
  // Status Change
  // =======================================

  const handleStatusChange = (id) => {
    const complaint = complaints.find(
      (c) => c._id === id
    );

    setSelectedComplaint(complaint);
  };

  // =======================================
  // Update Complaint
  // =======================================

  const handleSave = async (id, formData) => {
    try {
      await updateComplaintStatus(
        id,
        formData
      );

      toast.success(
        "Complaint Updated Successfully"
      );

      setSelectedComplaint(null);

      loadComplaints();
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message ||
          "Failed to update complaint"
      );
    }
  };

  // =======================================
  // Delete Complaint
  // =======================================

const handleDelete = async (id) => {
  try {
    await deleteComplaint(id);

    toast.success("Complaint Deleted Successfully");

    loadComplaints();
  } catch (err) {
    console.log(err);

    toast.error(
      err.response?.data?.message ||
        "Failed to delete complaint"
    );
  }
};

  // =======================================
  // UI
  // =======================================

  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">
        Complaint Management
      </h1>

      <ComplaintTable
        complaints={complaints}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />

      {selectedComplaint && (
        <ComplaintStatusModal
          complaint={selectedComplaint}
          onClose={() =>
            setSelectedComplaint(null)
          }
          onSave={handleSave}
        />
      )}

    </AdminLayout>
  );
}

export default Complaints;