import { useState } from "react";

function ComplaintForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Other",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      description: "",
      category: "Other",
      priority: "Medium",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-2xl font-bold mb-5">
        Submit Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Complaint Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full border rounded p-3"
          required
        />

        <div className="grid grid-cols-2 gap-4">

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded p-3"
          >
            <option>Electricity</option>
            <option>Water</option>
            <option>Cleaning</option>
            <option>Furniture</option>
            <option>Other</option>
          </select>

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="border rounded p-3"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700"
        >
          Submit Complaint
        </button>

      </form>
    </div>
  );
}

export default ComplaintForm;