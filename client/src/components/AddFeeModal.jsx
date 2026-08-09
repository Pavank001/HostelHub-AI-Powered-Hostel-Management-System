import { useState } from "react";

function AddFeeModal({ students, onClose, onSave }) {
  const [formData, setFormData] = useState({
    student: "",
    feeType: "",
    amount: "",
    dueDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...formData,
      amount: Number(formData.amount),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">

        <h2 className="text-2xl font-bold mb-5">
          Add Fee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Student */}
          <div>
            <label className="block font-medium mb-1">
              Student
            </label>

            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              className="w-full border p-3 rounded"
              required
            >
              <option value="">
                Select Student
              </option>

              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} - {student.email}
                </option>
              ))}
            </select>
          </div>

          {/* Fee Type */}
          <div>
            <label className="block font-medium mb-1">
              Fee Type
            </label>

            <input
              type="text"
              name="feeType"
              placeholder="Example: Hostel Fee"
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
              placeholder="Enter amount"
              min="1"
              value={formData.amount}
              onChange={handleChange}
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
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Fee
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default AddFeeModal;