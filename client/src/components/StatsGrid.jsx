function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

      {/* Students */}
      <div className="bg-blue-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">
          Students
        </h2>

        <p className="text-4xl font-bold mt-6">
          {stats?.totalStudents ?? 0}
        </p>
      </div>

      {/* Rooms */}
      <div className="bg-green-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">
          Rooms
        </h2>

        <p className="text-4xl font-bold mt-6">
          {stats?.totalRooms ?? 0}
        </p>
      </div>

      {/* Available Rooms */}
      <div className="bg-purple-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">
          Available
        </h2>

        <p className="text-4xl font-bold mt-6">
          {stats?.availableRooms ?? 0}
        </p>
      </div>

      {/* Complaints */}
      <div className="bg-red-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">
          Complaints
        </h2>

        <p className="text-4xl font-bold mt-6">
          {stats?.pendingComplaints ?? 0}
        </p>
      </div>

      {/* Leaves */}
      <div className="bg-yellow-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">
          Leaves
        </h2>

        <p className="text-4xl font-bold mt-6">
          {stats?.pendingLeaves ?? 0}
        </p>
      </div>

      {/* Pending Fees */}
      <div className="bg-pink-600 text-white rounded-xl p-6 shadow">
        <h2 className="text-xl font-semibold">
          Pending Fees
        </h2>

        <p className="text-4xl font-bold mt-6">
          {stats?.pendingFees ?? 0}
        </p>
      </div>

    </div>
  );
}

export default StatsGrid;