function ComplaintTable({
  complaints,
  onStatusChange,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Student</th>
            <th>Title</th>
            <th>Category</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((complaint) => (
            <tr
              key={complaint._id}
              className="border-b"
            >
              <td className="py-3">
                {complaint.student?.name}
              </td>

              <td>{complaint.title}</td>

              <td>{complaint.category}</td>

              <td>{complaint.priority}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded text-white text-sm
                    ${
                      complaint.status === "Pending"
                        ? "bg-yellow-500"
                        : complaint.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-green-600"
                    }`}
                >
                  {complaint.status}
                </span>
              </td>

              <td>
                <div className="flex gap-2">

                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      onStatusChange(
                        complaint._id,
                        e.target.value
                      )
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>

                  <button
                    onClick={() =>
                      onDelete(complaint._id)
                    }
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ComplaintTable;