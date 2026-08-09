import { useState } from "react";

function ComplaintStatusModal({
  complaint,
  onClose,
  onSave,
}) {
  const [status, setStatus] = useState(
    complaint.status
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(complaint._id, { status });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-100">
        <h2 className="text-2xl font-bold mb-5">
          Update Complaint
        </h2>

        <form onSubmit={handleSubmit}>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border p-3 rounded mb-5"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Resolved</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default ComplaintStatusModal;