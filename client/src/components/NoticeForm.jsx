import { useState } from "react";
import toast from "react-hot-toast";
function NoticeForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter notice title");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter notice description");
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
    });

    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow p-6">

      <h2 className="text-xl font-bold text-gray-900 mb-5">
        Publish New Notice
      </h2>

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notice Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter notice title..."
            className="
              w-full
              border border-gray-300
              rounded-lg
              p-3
              outline-none
              bg-white
              text-gray-900
              placeholder-gray-500
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Notice Description
          </label>

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your notice here..."
            rows={6}
            className="
              w-full
              border border-gray-300
              rounded-lg
              p-4
              resize-none
              outline-none
              bg-white
              text-gray-900
              placeholder-gray-500
              focus:ring-2
              focus:ring-blue-500
            "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-6
            py-3
            rounded-lg
            font-medium
            transition
          "
        >
          Publish Notice
        </button>

      </form>
    </div>
  );
}

export default NoticeForm;