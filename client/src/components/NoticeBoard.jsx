import { useEffect, useState } from "react";
import { getAllNotices } from "../services/noticeService";

function NoticeBoard() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      const data = await getAllNotices();
      setNotices(data.notices);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-5">
        📢 Notice Board
      </h2>

      {notices.length === 0 ? (
        <p className="text-gray-500">
          No notices available.
        </p>
      ) : (
        <div className="space-y-4">
          {notices.map((notice) => (
            <div
              key={notice._id}
              className="border rounded-lg p-4"
            >
              <h3 className="text-lg font-bold">
                {notice.title}
              </h3>

              <p className="text-gray-700 mt-2">
                {notice.description}
              </p>

              <p className="text-sm text-gray-500 mt-3">
                {new Date(notice.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NoticeBoard;