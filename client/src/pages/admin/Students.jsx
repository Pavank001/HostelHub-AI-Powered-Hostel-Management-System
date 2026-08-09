import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import StudentTable from "../../components/StudentTable";
import EditStudentModal from "../../components/EditStudentModal";
import AssignRoomModal from "../../components/AssignRoomModal";

import {
  getAllStudents,
  deleteStudent,
  updateStudent,
} from "../../services/studentService";

import { assignRoom } from "../../services/roomService";

function Students() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [assignStudent, setAssignStudent] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();
      setStudents(data.students);
    } catch (error) {
      console.log(error);
      alert("Failed to load students");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await deleteStudent(id);
      alert("Student Deleted Successfully");
      loadStudents();
    } catch (error) {
      console.log(error);
      alert("Failed to delete student");
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  const handleSave = async (id, formData) => {
    try {
      await updateStudent(id, formData);

      alert("Student Updated Successfully");

      setSelectedStudent(null);

      loadStudents();
    } catch (error) {
      console.log(error);
      alert("Failed to update student");
    }
  };

  // Assign Room
  const handleAssignClick = (student) => {
    setAssignStudent(student);
  };

  const handleAssignRoom = async (studentId, roomId) => {
  try {
    await assignRoom({
      studentId,
      roomId,
    });

    alert("Room Assigned Successfully");

    setAssignStudent(null);

    loadStudents();
  } catch (error) {
    console.log(error);

    alert(
      error.response?.data?.message ||
        "Failed to assign room"
    );
  }
};

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">
        Student Management
      </h1>

      <StudentTable
        students={students}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onAssign={handleAssignClick}
      />

      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onSave={handleSave}
        />
      )}

      {assignStudent && (
        <AssignRoomModal
          student={assignStudent}
          onClose={() => setAssignStudent(null)}
          onAssign={handleAssignRoom}
        />
      )}
    </AdminLayout>
  );
}

export default Students;