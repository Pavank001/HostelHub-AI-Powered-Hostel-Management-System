function ComplaintCard({ complaint }) {
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "In Progress":
        return "bg-blue-500";
      case "Resolved":
        return "bg-green-600";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "text-red-600";
      case "Medium":
        return "text-orange-500";
      case "Low":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-5 border">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-bold">
          {complaint.title}
        </h2>

        <span
          className={`text-white px-3 py-1 rounded-full text-sm ${getStatusColor(
            complaint.status
          )}`}
        >
          {complaint.status}
        </span>
      </div>

      <p className="text-gray-600 mb-3">
        {complaint.description}
      </p>

      <div className="flex justify-between text-sm">
        <p>
          <span className="font-semibold">
            Category:
          </span>{" "}
          {complaint.category}
        </p>

        <p className={getPriorityColor(complaint.priority)}>
          <span className="font-semibold text-black">
            Priority:
          </span>{" "}
          {complaint.priority}
        </p>
      </div>

      <p className="text-gray-500 text-xs mt-3">
        {new Date(complaint.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ComplaintCard;