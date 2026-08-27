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

  const loadComplaints = async () => {
    try {
      const data = await getMyComplaints();
      setComplaints(data.complaints);
    } catch (err) {
      console.log(err);
    }
  };

 const handleSubmit = async (formData) => {
  try {
    await createComplaint(formData);

    toast.success("Complaint Submitted Successfully");

    setFormData({
      title: "",
      description: "",
      category: "Other",
      priority: "Medium",
    });

    await loadComplaints();

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to submit complaint"
    );
  }
};

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">My Complaints</h1>

      <ComplaintForm onSubmit={handleSubmit} />

      <div className="grid md:grid-cols-2 gap-5">
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