import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import RoomCard from "../../components/RoomCard";
import { getMyRoom } from "../../services/roomService";

function Room() {
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoom();
  }, []);

  const loadRoom = async () => {
    try {
      const data = await getMyRoom();
      setRoom(data.room);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 404) {
        alert("No room assigned yet.");
      } else {
        alert("Failed to load room details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">My Room</h1>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : room ? (
        <RoomCard room={room} />
      ) : (
        <div className="rounded-lg bg-yellow-100 p-6 text-yellow-700">
          No room has been assigned to you yet.
        </div>
      )}
    </StudentLayout>
  );
}

export default Room;