import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import StudentLayout from "../../layouts/StudentLayout";
import { getProfile } from "../../services/studentService";
import ProfileCard from "../../components/ProfileCard";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await getProfile();
      setUser(data.student);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load profile");
    }
  };

  return (
    <StudentLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>

        {user && (
          <button
            onClick={() => navigate("/student/profile/edit")}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
      </div>

      {user ? (
        <ProfileCard user={user} />
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </StudentLayout>
  );
}

export default Profile;