function FeeTable({
  fees,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">

      <table className="w-full">

        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Student</th>
            <th>Fee Type</th>
            <th>Amount</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {fees.map((fee) => (
            <tr key={fee._id} className="border-b">

              <td>{fee.student?.name}</td>

              <td>{fee.feeType}</td>

              <td>₹{fee.amount}</td>

              <td>
                {new Date(
                  fee.dueDate
                ).toLocaleDateString()}
              </td>

              <td>

                <span
                  className={`px-3 py-1 rounded text-white
                  ${
                    fee.status === "Paid"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {fee.status}
                </span>

              </td>

              <td>

                <div className="flex gap-2">

                  <button
                    onClick={() => onEdit(fee)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(fee._id)
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

export default FeeTable;