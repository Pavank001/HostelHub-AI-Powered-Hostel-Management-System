import { useEffect, useState } from "react";
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

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await getAllComplaints();
      setComplaints(data.complaints);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = (id) => {
    const complaint = complaints.find(
      (c) => c._id === id
    );
    setSelectedComplaint(complaint);
  };

  const handleSave = async (id, formData) => {
    try {
      await updateComplaintStatus(id, formData);

      alert("Complaint Updated Successfully");

      setSelectedComplaint(null);

      loadComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Complaint?"))
      return;

    try {
      await deleteComplaint(id);

      alert("Complaint Deleted");

      loadComplaints();
    } catch (err) {
      console.log(err);
    }
  };

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