function LeaveCard({ leave }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="flex justify-between mb-3">
        <h2 className="font-bold text-lg">
          Leave Request
        </h2>

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
      </div>

      <p>
        <strong>From:</strong>{" "}
        {new Date(leave.fromDate).toLocaleDateString()}
      </p>

      <p>
        <strong>To:</strong>{" "}
        {new Date(leave.toDate).toLocaleDateString()}
      </p>

      <p className="mt-3">
        <strong>Reason:</strong>
      </p>

      <p>{leave.reason}</p>

    </div>
  );
}

export default LeaveCard;