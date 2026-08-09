import { useState } from "react";

function UpdateFeeModal({ fee, onClose, onSave }) {
  const [formData, setFormData] = useState({
    feeType: fee.feeType || "",
    amount: fee.amount || "",
    dueDate: fee.dueDate
      ? fee.dueDate.substring(0, 10)
      : "",
    status: fee.status || "Pending",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const updatedData = {
        feeType: formData.feeType,
        amount: Number(formData.amount),
        dueDate: formData.dueDate,
        status: formData.status,
      };

      console.log("Updating Fee ID:", fee._id);
      console.log("Updating Fee Data:", updatedData);

      await onSave(fee._id, updatedData);

    } catch (error) {
      console.log("Update Fee Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold mb-5">
          Update Fee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Fee Type */}

          <div>
            <label className="block font-medium mb-1">
              Fee Type
            </label>

            <input
              type="text"
              name="feeType"
              value={formData.feeType}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
          </div>

          {/* Amount */}

          <div>
            <label className="block font-medium mb-1">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              onChangeCapture={(e) => {
                e.target.value = e.target.value.replace(
                  /[^0-9]/g,
                  ""
                );
              }}
              className="w-full border p-3 rounded"
              required
            />
          </div>

          {/* Due Date */}

          <div>
            <label className="block font-medium mb-1">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            />
          </div>

          {/* Status */}

          <div>
            <label className="block font-medium mb-1">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-3 rounded"
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Paid">
                Paid
              </option>
            </select>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default UpdateFeeModal;