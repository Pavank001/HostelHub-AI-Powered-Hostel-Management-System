import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  // Room that user wants to delete
  const [deleteRoomData, setDeleteRoomData] = useState(null);

  useEffect(() => {
    loadRooms();
  }, []);

  // =======================================
  // Load Rooms
  // =======================================

  const loadRooms = async () => {
    try {
      const data = await getAllRooms();

      setRooms(data.rooms || []);
    } catch (error) {
      console.log(error);

      toast.error("Failed to load rooms");
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

      await loadRooms();
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

      await loadRooms();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update room"
      );
    }
  };

  // =======================================
  // Open Delete Confirmation
  // =======================================

  const handleDeleteClick = (room) => {
    setDeleteRoomData(room);
  };

  // =======================================
  // Confirm Delete
  // =======================================

  const handleConfirmDelete = async () => {
    if (!deleteRoomData) return;

    try {
      await deleteRoom(deleteRoomData._id);

      toast.success("Room Deleted Successfully");

      setDeleteRoomData(null);

      await loadRooms();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete room"
      );
    }
  };

  // =======================================
  // Cancel Delete
  // =======================================

  const handleCancelDelete = () => {
    setDeleteRoomData(null);
  };

  return (
    <AdminLayout>

      {/* ===================================
          HEADER
      =================================== */}

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Room Management
        </h1>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Add Room
        </button>

      </div>


      {/* ===================================
          ROOM TABLE
      =================================== */}

      <RoomTable
        rooms={rooms}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />


      {/* ===================================
          ADD ROOM MODAL
      =================================== */}

      {showAddModal && (
        <AddRoomModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAdd}
        />
      )}


      {/* ===================================
          EDIT ROOM MODAL
      =================================== */}

      {selectedRoom && (
        <EditRoomModal
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSave={handleUpdate}
        />
      )}


      {/* ===================================
          DELETE CONFIRMATION MODAL
      =================================== */}

      {deleteRoomData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">

            {/* Icon */}

            <div className="flex justify-center mb-4">

              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                ⚠️
              </div>

            </div>


            {/* Title */}

            <h2 className="text-xl font-bold text-center text-gray-900">
              Delete Room?
            </h2>


            {/* Message */}

            <p className="text-center text-gray-500 mt-2">
              Are you sure you want to delete room{" "}
              <span className="font-semibold text-gray-800">
                {deleteRoomData.roomNumber}
              </span>
              ?
            </p>

            <p className="text-center text-sm text-red-500 mt-2">
              This action cannot be undone.
            </p>


            {/* Buttons */}

            <div className="flex justify-center gap-3 mt-6">

              <button
                onClick={handleCancelDelete}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold"
              >
                Delete Room
              </button>

            </div>

          </div>

        </div>
      )}

    </AdminLayout>
  );
}

export default Rooms;