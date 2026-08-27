import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";

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

  // =======================================
  // Load Rooms
  // =======================================

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const data = await getAllRooms();

      setRooms(data.rooms || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load rooms"
      );
    }
  };

  // =======================================
  // Add Room
  // =======================================

  const handleAdd = async (formData) => {
    try {
      await createRoom(formData);

      toast.success("Room Created Successfully");

      setShowAddModal(false);

      loadRooms();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to create room"
      );
    }
  };

  // =======================================
  // Edit Room
  // =======================================

  const handleEdit = (room) => {
    setSelectedRoom(room);
  };

  // =======================================
  // Update Room
  // =======================================

  const handleUpdate = async (id, formData) => {
    try {
      await updateRoom(id, formData);

      toast.success("Room Updated Successfully");

      setSelectedRoom(null);

      loadRooms();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update room"
      );
    }
  };

  // =======================================
  // Delete Room
  // =======================================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room?"
    );

    if (!confirmed) return;

    try {
      await deleteRoom(id);

      toast.success("Room Deleted Successfully");

      loadRooms();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete room"
      );
    }
  };

  // =======================================
  // UI
  // =======================================

  return (
    <AdminLayout>

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Room Management
        </h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
        >
          Add Room
        </button>

      </div>


      {/* Room Table */}

      <RoomTable
        rooms={rooms}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />


      {/* Add Room Modal */}

      {showAddModal && (
        <AddRoomModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}


      {/* Edit Room Modal */}

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