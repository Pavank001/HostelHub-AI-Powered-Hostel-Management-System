import { useState } from "react";

function LeaveStatusModal({
  leave,
  onClose,
  onSave,
}) {
  const [status, setStatus] = useState(
    leave.status
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(leave._id, { status });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white rounded-xl p-6 w-96">

        <h2 className="text-2xl font-bold mb-5">
          Update Leave Status
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border rounded p-3"
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
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
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default LeaveStatusModal;