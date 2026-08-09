function NoticeCard({ notice }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow p-6">

      {/* Notice Title */}
      <h2 className="text-xl font-bold text-gray-900">
        {notice.title}
      </h2>

      {/* Notice Description */}
      <p className="mt-3 text-gray-700 leading-relaxed">
        {notice.description}
      </p>

      {/* Notice Information */}
      <div className="mt-4 text-sm text-gray-500">

        <p>
          Posted By:{" "}
          <span className="font-medium text-gray-700">
            {notice.postedBy?.name || "Admin"}
          </span>
        </p>

        <p className="mt-1">
          {notice.createdAt
            ? new Date(notice.createdAt).toLocaleDateString()
            : ""}
        </p>

      </div>

    </div>
  );
}

export default NoticeCard;