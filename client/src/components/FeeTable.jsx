function FeeTable({
  fees,
  onEdit,
  onDelete,
  onMarkAsPaid,
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
            <th>Payment Note</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {fees.map((fee) => (

            <tr key={fee._id} className="border-b">

              {/* Student */}
              <td className="py-4">
                {fee.student?.name}
              </td>

              {/* Fee Type */}
              <td>
                {fee.feeType}
              </td>

              {/* Amount */}
              <td>
                ₹{fee.amount}
              </td>

              {/* Due Date */}
              <td>
                {new Date(
                  fee.dueDate
                ).toLocaleDateString()}
              </td>

              {/* Status */}
              <td>

                <span
                  className={`px-3 py-1 rounded text-white ${
                    fee.status === "Paid"
                      ? "bg-green-600"
                      : fee.status ===
                        "Partially Paid"
                      ? "bg-yellow-500"
                      : "bg-red-600"
                  }`}
                >
                  {fee.status}
                </span>

              </td>

              {/* Payment Note */}
              <td className="min-w-[250px]">

                {fee.status === "Pending" &&
                fee.paymentNote ? (

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">

                    <p className="text-sm font-semibold text-blue-700">
                      📝 Student Note
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                      {fee.paymentNote}
                    </p>

                    {/* Mark as Paid */}
                    <button
                      onClick={() =>
                        onMarkAsPaid(fee._id)
                      }
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      ✅ Mark as Paid
                    </button>

                  </div>

                ) : (

                  <span className="text-gray-400 text-sm">
                    No payment note
                  </span>

                )}

              </td>

              {/* Actions */}
              <td>

                <div className="flex gap-2">

                  {/* Edit */}
                  <button
                    onClick={() =>
                      onEdit(fee)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() =>
                      onDelete(fee._id)
                    }
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
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