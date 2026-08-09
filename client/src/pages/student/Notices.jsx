import { useEffect, useState } from "react";
import StudentLayout from "../../layouts/StudentLayout";
import NoticeCard from "../../components/NoticeCard";

import { getAllNotices } from "../../services/noticeService";

function Notices() {
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
    <StudentLayout>
      <h1 className="text-3xl font-bold mb-6">
        Hostel Notices
      </h1>

      <div className="space-y-5">
        {notices.map((notice) => (
          <NoticeCard
            key={notice._id}
            notice={notice}
          />
        ))}
      </div>
    </StudentLayout>
  );
}

export default Notices;