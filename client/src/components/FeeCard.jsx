function FeeCard({ fee }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {fee.feeType}
        </h2>

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
      </div>

      <p>
        <strong>Amount :</strong> ₹{fee.amount}
      </p>

      <p className="mt-2">
        <strong>Due Date :</strong>{" "}
        {new Date(fee.dueDate).toLocaleDateString()}
      </p>

    </div>
  );
}

export default FeeCard;