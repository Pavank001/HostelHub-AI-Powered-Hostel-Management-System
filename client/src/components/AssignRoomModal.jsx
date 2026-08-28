import { useEffect, useState } from "react";
import { getAvailableRooms } from "../services/roomService";
import toast from "react-hot-toast";
function AssignRoomModal({ student, onAssign, onClose }) {
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);

  // Load available rooms
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);

      const data = await getAvailableRooms();

      setRooms(data.rooms || []);

      if (data.rooms && data.rooms.length > 0) {
        setRoomId(data.rooms[0]._id);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load available rooms"
      );
    } finally {
      setLoading(false);
    }
  };

  // Assign selected room
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!roomId) {
      toast.error("Please select a room");
      return;
    }

    try {
      setAssigning(true);

      await onAssign(student._id, roomId);
    } catch (error) {
      console.log(error);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Assign Room
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Student */}
        <div className="bg-gray-100 rounded-lg p-4 mb-5">
          <p className="text-sm text-gray-500">
            Student
          </p>

          <p className="font-semibold text-lg">
            {student?.name}
          </p>

          <p className="text-sm text-gray-600">
            {student?.email}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Loading */}
          {loading && (
            <div className="text-center py-6">
              <p className="text-gray-500">
                Loading available rooms...
              </p>
            </div>
          )}

          {/* No rooms */}
          {!loading && rooms.length === 0 && (
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-5">
              <p className="font-semibold">
                No rooms available
              </p>

              <p className="text-sm mt-1">
                Please create a room or free a bed before
                assigning a room.
              </p>
            </div>
          )}

          {/* Room selection */}
          {!loading && rooms.length > 0 && (
            <div className="mb-5">
              <label className="block font-semibold mb-2">
                Select Room
              </label>

              <select
                value={roomId}
                onChange={(e) =>
                  setRoomId(e.target.value)
                }
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {rooms.map((room) => (
                  <option
                    key={room._id}
                    value={room._id}
                  >
                    {room.roomNumber} -{" "}
                    {room.hostelBlock} - Floor{" "}
                    {room.floor} -{" "}
                    {room.occupiedBeds}/
                    {room.capacity} beds
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                loading ||
                rooms.length === 0 ||
                !roomId ||
                assigning
              }
              className={`px-5 py-2 rounded-lg text-white ${
                loading ||
                rooms.length === 0 ||
                !roomId ||
                assigning
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {assigning
                ? "Assigning..."
                : "Assign Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignRoomModal;