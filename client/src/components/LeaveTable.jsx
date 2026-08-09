function LeaveTable({
  leaves,
  onStatusChange,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <table className="w-full">

        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Student</th>
            <th>From</th>
            <th>To</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {leaves.map((leave) => (
            <tr key={leave._id} className="border-b">

              <td className="py-3">
                {leave.student?.name}
              </td>

              <td>
                {new Date(
                  leave.fromDate
                ).toLocaleDateString()}
              </td>

              <td>
                {new Date(
                  leave.toDate
                ).toLocaleDateString()}
              </td>

              <td>{leave.reason}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded text-white
                  ${
                    leave.status === "Approved"
                      ? "bg-green-600"
                      : leave.status === "Rejected"
                      ? "bg-red-600"
                      : "bg-yellow-500"
                  }`}
                >
                  {leave.status}
                </span>
              </td>

              <td className="space-x-2">
                <button
                  onClick={() =>
                    onStatusChange(leave._id)
                  }
                  className="bg-yellow-500 text-white px-3 py-2 rounded"
                >
                  Update
                </button>

                <button
                  onClick={() =>
                    onDelete(leave._id)
                  }
                  className="bg-red-600 text-white px-3 py-2 rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default LeaveTable;