function StudentTable({ students, onDelete, onEdit, onAssign }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b text-left">
            <th className="py-3">Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Room</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id} className="border-b">
              <td className="py-3">{student.name}</td>

              <td>{student.email}</td>

              <td>{student.phone}</td>

              <td>
                {student.room
                  ? student.room.roomNumber
                  : "Not Assigned"}
              </td>

              <td>
                <div className="flex gap-2">

                  <button
                    onClick={() => onEdit(student)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(student._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => onAssign(student)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Assign Room
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

export default StudentTable;