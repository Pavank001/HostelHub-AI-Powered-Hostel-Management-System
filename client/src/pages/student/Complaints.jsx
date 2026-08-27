import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StudentLayout from "../../layouts/StudentLayout";
import ComplaintForm from "../../components/ComplaintForm";
import ComplaintCard from "../../components/ComplaintCard";

import {
  createComplaint,
  getMyComplaints,
} from "../../services/complaintService";

function Complaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    loadComplaints();
  }, []);

  // ===============================
  // Load My Complaints
  // ===============================

  const loadComplaints = async () => {
    try {
      const data = await getMyComplaints();

      setComplaints(data.complaints || []);
    } catch (error) {
      console.log("LOAD COMPLAINTS ERROR:", error);
    }
  };

  // ===============================
  // Submit Complaint
  // ===============================

  const handleSubmit = async (formData) => {
    try {
      await createComplaint(formData);

      // Success toast
      toast.success("Complaint Submitted Successfully");

      // Reload complaints
      await loadComplaints();

    } catch (error) {
      console.log("SUBMIT COMPLAINT ERROR:", error);

      toast.error(
        error.response?.data?.message ||
        "Failed to submit complaint"
      );
      throw error;
    }
  };

  return (
    <StudentLayout>

      <h1 className="text-3xl font-bold mb-6">
        My Complaints
      </h1>

      {/* Complaint Form */}
      <ComplaintForm
        onSubmit={handleSubmit}
      />

      {/* Complaints */}
      <div className="grid md:grid-cols-2 gap-5 mt-6">

        {complaints.map((complaint) => (
          <ComplaintCard
            key={complaint._id}
            complaint={complaint}
          />
        ))}

      </div>

    </StudentLayout>
  );
}

export default Complaints;