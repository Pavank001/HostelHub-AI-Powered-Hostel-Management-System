import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(formData);

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Login failed. Please check your email and password."
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
        className={`w-full max-w-md rounded-xl shadow-xl p-8 transition-colors duration-300 ${
          dark
            ? "bg-gray-800 text-white"
            : "bg-white text-gray-900"
        }`}
      >
        {/* Heading */}

        <h1
          className={`text-3xl font-bold text-center mb-8 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          HostelHub Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}

          <div>
            <label
              className={`block mb-2 font-medium ${
                dark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full px-4 py-3 rounded-lg border outline-none transition ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
              }`}
            />
          </div>

          {/* Password */}

          <div>
            <label
              className={`block mb-2 font-medium ${
                dark ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`w-full px-4 py-3 rounded-lg border outline-none transition ${
                dark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
              }`}
            />
          </div>

          {/* Login Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register */}

        <p
          className={`text-center mt-6 ${
            dark ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-500 font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;