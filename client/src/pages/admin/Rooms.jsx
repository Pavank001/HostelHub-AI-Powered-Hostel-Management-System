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

      setRooms(data.rooms || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load rooms");
    }
  };

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

  const handleEdit = (room) => {
    setSelectedRoom(room);
  };

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

  // SIMPLE DELETE
  const handleDelete = async (id) => {
    try {
      await deleteRoom(id);

      toast.success("Room Deleted Successfully");

      await loadRooms();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete room"
      );
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
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold"
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