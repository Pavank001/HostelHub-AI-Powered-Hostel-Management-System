import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import RoomTable from "../../components/RoomTable";
import AddRoomModal from "../../components/AddRoomModal";
import EditRoomModal from "../../components/EditRoomModal";

import {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
} from "../../services/roomService";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getAllRooms();
      setRooms(data.rooms);
    } catch (error) {
      console.log(error);
      alert("Failed to load rooms");
    }
  };

  const handleAdd = async (formData) => {
    try {
      await createRoom(formData);
      alert("Room Created Successfully");
      setShowAddModal(false);
      loadRooms();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create room");
    }
  };

  const handleEdit = (room) => {
    setSelectedRoom(room);
  };

  const handleUpdate = async (id, formData) => {
    try {
      await updateRoom(id, formData);
      alert("Room Updated Successfully");
      setSelectedRoom(null);
      loadRooms();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to update room");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this room?")) return;

    try {
      await deleteRoom(id);
      alert("Room Deleted Successfully");
      loadRooms();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to delete room");
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Room Management
        </h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 text-white px-5 py-2 rounded"
        >
          Add Room
        </button>
      </div>

      <RoomTable
        rooms={rooms}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showAddModal && (
        <AddRoomModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}

      {selectedRoom && (
        <EditRoomModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSave={handleUpdate}
        />
      )}
    </AdminLayout>
  );
}

export default Rooms;