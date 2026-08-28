import { useState } from "react";

function LeaveForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);

  // =======================================
  // Handle Input Change
  // =======================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // =======================================
  // Submit Leave
  // =======================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onSubmit(formData);

      // Clear form only after successful submission
      setFormData({
        fromDate: "",
        toDate: "",
        reason: "",
      });

    } catch (error) {
      console.log("LEAVE FORM ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">

      <h2 className="text-2xl font-bold mb-5">
        Apply Leave
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* From Date */}
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        {/* To Date */}
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        {/* Reason */}
        <textarea
          name="reason"
          placeholder="Reason"
          rows="4"
          value={formData.reason}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded"
        >
          {loading ? "Applying..." : "Apply Leave"}
        </button>

      </form>
    </div>
  );
}

export default LeaveForm;