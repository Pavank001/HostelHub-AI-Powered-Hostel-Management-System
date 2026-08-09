import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Always register as student
      const studentData = {
        ...formData,
        role: "student",
      };

      await registerUser(studentData);

      alert("Student Registration Successful!");

      navigate("/login");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        dark ? "bg-gray-950" : "bg-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300 ${
          dark
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">
          HostelHub Registration
        </h1>

        <p
          className={`text-center mb-8 ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Create your Student account
        </p>

        <form onSubmit={handleSubmit}>

          {/* Full Name */}
          <label
            className={`block mb-2 font-semibold ${
              dark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg mb-4 border outline-none ${
              dark
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"
            }`}
            required
          />

          {/* Email */}
          <label
            className={`block mb-2 font-semibold ${
              dark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg mb-4 border outline-none ${
              dark
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"
            }`}
            required
          />

          {/* Phone */}
          <label
            className={`block mb-2 font-semibold ${
              dark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg mb-4 border outline-none ${
              dark
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"
            }`}
            required
          />

          {/* Password */}
          <label
            className={`block mb-2 font-semibold ${
              dark ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-3 rounded-lg mb-6 border outline-none ${
              dark
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"
            }`}
            required
          />

          {/* Register */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Register as Student"}
          </button>

          {/* Login */}
          <p
            className={`text-center mt-6 ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 font-semibold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;