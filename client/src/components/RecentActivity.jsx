function RecentActivity() {
  return (
    <div className="bg-white text-gray-900 rounded-xl shadow p-8">

      <h2 className="text-2xl font-bold mb-4">
        Recent Activity
      </h2>

      <ul className="space-y-3">
        <li>📝 New complaint submitted</li>
        <li>📅 Leave request received</li>
        <li>🏠 Room allocated</li>
        <li>💰 Fee paid</li>
      </ul>

    </div>
  );
}

export default RecentActivity;