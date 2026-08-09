import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";

import LeaveForm from "../../components/LeaveForm";
import LeaveCard from "../../components/LeaveCard";

import {
  applyLeave,
  getMyLeaves,
} from "../../services/leaveService";

function Leave() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    loadLeaves();
  }, []);

  const loadLeaves = async () => {
    try {
      const data = await getMyLeaves();
      setLeaves(data.leaves);
    } catch (error) {
      console.log(error);
      alert("Failed to load leaves");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      await applyLeave(formData);

      alert("Leave Applied Successfully");

      loadLeaves();
    } catch (error) {
      console.log(error);
      alert("Failed to apply leave");
    }
  };

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">
        My Leave Requests
      </h1>

      <LeaveForm onSubmit={handleSubmit} />

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