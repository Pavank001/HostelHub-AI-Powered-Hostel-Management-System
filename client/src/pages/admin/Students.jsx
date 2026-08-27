import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

  // =======================================
  // Load Students
  // =======================================

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();

      setStudents(data.students || []);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load students"
      );
    }
  };

  // =======================================
  // Delete Student
  // =======================================

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

  // =======================================
  // Edit Student
  // =======================================

  const handleEdit = (student) => {
    setSelectedStudent(student);
  };

  // =======================================
  // Update Student
  // =======================================

  const handleSave = async (id, formData) => {
    try {
      await updateStudent(id, formData);

      toast.success(
        "Student Updated Successfully"
      );

      setSelectedStudent(null);

      loadStudents();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update student"
      );
    }
  };

  // =======================================
  // Assign Room
  // =======================================

  const handleAssignClick = (student) => {
    setAssignStudent(student);
  };

  const handleAssignRoom = async (
    studentId,
    roomId
  ) => {
    try {
      await assignRoom({
        studentId,
        roomId,
      });

      toast.success(
        "Room Assigned Successfully"
      );

      setAssignStudent(null);

      loadStudents();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to assign room"
      );
    }
  };

  // =======================================
  // UI
  // =======================================

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

      {/* Edit Student */}

      {selectedStudent && (
        <EditStudentModal
          student={selectedStudent}
          onClose={() =>
            setSelectedStudent(null)
          }
          onSave={handleSave}
        />
      )}

      {/* Assign Room */}

      {assignStudent && (
        <AssignRoomModal
          student={assignStudent}
          onClose={() =>
            setAssignStudent(null)
          }
          onAssign={handleAssignRoom}
        />
      )}

    </AdminLayout>
  );
}

export default Students;