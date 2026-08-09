import { useState } from "react";

function LeaveForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      fromDate: "",
      toDate: "",
      reason: "",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-5">
        Apply Leave
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <textarea
          name="reason"
          placeholder="Reason"
          rows="4"
          value={formData.reason}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Apply Leave
        </button>

      </form>
    </div>
  );
}

export default LeaveForm;