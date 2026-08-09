import { useEffect, useState } from "react";

function EditRoomModal({ room, onClose, onSave }) {
  const [formData, setFormData] = useState({
    roomNumber: "",
    floor: "",
    hostelBlock: "",
    roomType: "",
    capacity: "",
    status: "",
  });

  useEffect(() => {
    if (room) {
      setFormData({
        roomNumber: room.roomNumber,
        floor: room.floor,
        hostelBlock: room.hostelBlock,
        roomType: room.roomType,
        capacity: room.capacity,
        status: room.status,
      });
    }
  }, [room]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "floor" || e.target.name === "capacity"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(room._id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-112.5">
        <h2 className="text-2xl font-bold mb-5">
          Edit Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="hostelBlock"
            value={formData.hostelBlock}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="A">Block A</option>
            <option value="B">Block B</option>
            <option value="C">Block C</option>
          </select>

          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Triple">Triple</option>
          </select>

          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="Available">Available</option>
            <option value="Full">Full</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update Room
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditRoomModal;