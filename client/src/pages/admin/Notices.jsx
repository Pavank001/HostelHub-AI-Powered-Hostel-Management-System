import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import NoticeForm from "../../components/NoticeForm";
import NoticeCard from "../../components/NoticeCard";

import {
  getAllNotices,
  createNotice,
  deleteNotice,
} from "../../services/noticeService";

function Notices() {
  const [notices, setNotices] = useState([]);

  // ==============================
  // Load Notices
  // ==============================

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const data = await getAllNotices();

      setNotices(data.notices || []);
    } catch (error) {
      console.log("LOAD NOTICES ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load notices"
      );
    }
  };

  // ==============================
  // Create Notice
  // ==============================

  const handleSubmit = async (formData) => {
    try {
      await createNotice(formData);

      toast.success("Notice Published Successfully");

      await loadNotices();
    } catch (error) {
      console.log("CREATE NOTICE ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to publish notice"
      );
    }
  };

  // ==============================
  // Delete Notice
  // ==============================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notice?"
    );

    if (!confirmed) return;

    try {
      await deleteNotice(id);

      toast.success("Notice Deleted Successfully");

      await loadNotices();
    } catch (error) {
      console.log("DELETE NOTICE ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete notice"
      );
    }
  };

  // ==============================
  // UI
  // ==============================

  return (
    <AdminLayout>

      {/* Page Header */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-900">
          Notice Board
        </h1>

        <p className="mt-1 text-gray-500">
          Publish important announcements and hostel notices.
        </p>

      </div>

      {/* Notice Form */}
      <div className="mb-8">
        <NoticeForm onSubmit={handleSubmit} />
      </div>

      {/* Notices List */}
      <div className="space-y-5">

        {notices.length === 0 ? (

          <div className="bg-white border border-gray-200 rounded-xl shadow p-8 text-center">

            <p className="text-gray-500">
              No notices available.
            </p>

          </div>

        ) : (

          notices.map((notice) => (

            <div
              key={notice._id}
              className="relative"
            >

              <NoticeCard notice={notice} />

              {/* Delete Button */}
              <button
                onClick={() =>
                  handleDelete(notice._id)
                }
                className="absolute top-5 right-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Delete
              </button>

            </div>

          ))

        )}

      </div>

    </AdminLayout>
  );
}

export default Notices;