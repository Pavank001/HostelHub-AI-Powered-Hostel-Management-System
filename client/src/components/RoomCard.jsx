import {
  FaBed,
  FaBuilding,
  FaLayerGroup,
  FaUsers,
  FaCheckCircle,
} from "react-icons/fa";

function RoomCard({ room }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl">

      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        🏠 Room Details
      </h2>

      <div className="space-y-5">

        <div className="flex items-center gap-3">
          <FaBed className="text-blue-600 text-xl" />
          <span className="font-semibold">Room Number:</span>
          <span>{room.roomNumber}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaLayerGroup className="text-blue-600 text-xl" />
          <span className="font-semibold">Floor:</span>
          <span>{room.floor}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaBuilding className="text-blue-600 text-xl" />
          <span className="font-semibold">Hostel Block:</span>
          <span>{room.hostelBlock}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaBed className="text-blue-600 text-xl" />
          <span className="font-semibold">Room Type:</span>
          <span>{room.roomType}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaUsers className="text-blue-600 text-xl" />
          <span className="font-semibold">Capacity:</span>
          <span>{room.capacity}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaUsers className="text-blue-600 text-xl" />
          <span className="font-semibold">Occupied Beds:</span>
          <span>{room.occupiedBeds}</span>
        </div>

        <div className="flex items-center gap-3">
          <FaCheckCircle className="text-green-600 text-xl" />
          <span className="font-semibold">Status:</span>

          <span
            className={`px-3 py-1 rounded-full text-white ${
              room.status === "Available"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {room.status}
          </span>
        </div>

      </div>

    </div>
  );
}

export default RoomCard;