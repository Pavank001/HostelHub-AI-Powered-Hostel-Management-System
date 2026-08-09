import { useState } from "react";

function AddRoomModal({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    roomNumber: "",
    floor: "",
    hostelBlock: "A",
    roomType: "Single",
    capacity: 1,
  });

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
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white rounded-xl p-6 w-105">
        <h2 className="text-2xl font-bold mb-5">
          Add New Room
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            name="floor"
            placeholder="Floor"
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
            placeholder="Capacity"
            value={formData.capacity}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRoomModal;