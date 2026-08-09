import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope } from "react-icons/fa";
import { updateProfile } from "../../services/studentService";

function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await updateProfile(formData);

    localStorage.setItem("user", JSON.stringify(data.student));

    alert("✅ Profile Updated Successfully");

    navigate("/student/profile");

  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message || "Failed to update profile"
    );
  }
};

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-semibold">
              <FaUser />
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-semibold">
              <FaEnvelope />
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              readOnly
              className="w-full border rounded-lg p-3 bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 flex items-center gap-2 font-semibold">
              <FaPhone />
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/student/profile")}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default EditProfile;