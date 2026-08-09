function RoomTable({ rooms, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Room No.</th>
            <th>Block</th>
            <th>Floor</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Occupied</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room) => (
            <tr key={room._id} className="border-b">
              <td className="py-3">{room.roomNumber}</td>
              <td>{room.hostelBlock}</td>
              <td>{room.floor}</td>
              <td>{room.roomType}</td>
              <td>{room.capacity}</td>
              <td>{room.occupiedBeds}</td>
              <td>{room.status}</td>

              <td>
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(room)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(room._id)}
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

export default RoomTable;