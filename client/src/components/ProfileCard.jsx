import { FaUserCircle, FaEnvelope, FaPhone, FaUserTag, FaBed } from "react-icons/fa";

function ProfileCard({ user }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl">

      <div className="flex items-center gap-6 mb-8">
        <FaUserCircle className="text-8xl text-blue-600" />

        <div>
          <h2 className="text-3xl font-bold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="flex items-center gap-3">
          <FaEnvelope className="text-blue-600" />
          <div>
            <p className="text-gray-500">Email</p>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaPhone className="text-green-600" />
          <div>
            <p className="text-gray-500">Phone</p>
            <p>{user.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaUserTag className="text-purple-600" />
          <div>
            <p className="text-gray-500">Role</p>
            <p className="capitalize">{user.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <FaBed className="text-orange-600" />
          <div>
            <p className="text-gray-500">Room</p>
            <p>{user.room?.roomNumber || "Not Assigned"}</p>
          </div>
        </div>

      </div>

      <button
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        Edit Profile
      </button>

    </div>
  );
}

export default ProfileCard;