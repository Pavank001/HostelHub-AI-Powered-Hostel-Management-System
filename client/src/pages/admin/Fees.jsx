import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import FeeTable from "../../components/FeeTable";
import AddFeeModal from "../../components/AddFeeModal";
import UpdateFeeModal from "../../components/UpdateFeeModal";

import {
  getAllFees,
  createFee,
  updateFee,
  deleteFee,
  updateFeeStatus,
} from "../../services/feeService";

import { getAllStudents } from "../../services/studentService";

function Fees() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  const [loading, setLoading] = useState(true);

  // =======================================
  // Load Data
  // =======================================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        loadFees(),
        loadStudents(),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =======================================
  // Get All Fees
  // =======================================

  const loadFees = async () => {
    try {
      const data = await getAllFees();

      setFees(data.fees || []);
    } catch (error) {
      console.log("LOAD FEES ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load fees"
      );
    }
  };

  // =======================================
  // Get All Students
  // =======================================

  const loadStudents = async () => {
    try {
      const data = await getAllStudents();

      setStudents(data.students || []);
    } catch (error) {
      console.log("LOAD STUDENTS ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load students"
      );
    }
  };

  // =======================================
  // Create Fee
  // =======================================

  const handleCreate = async (formData) => {
    try {
      await createFee(formData);

      toast.success("Fee Added Successfully");

      setShowAddModal(false);

      await loadFees();
    } catch (error) {
      console.log("CREATE FEE ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add fee"
      );
    }
  };

  // =======================================
  // Update Fee
  // =======================================

  const handleUpdate = async (id, formData) => {
    try {
      const response = await updateFee(id, formData);

      console.log("UPDATE RESPONSE:", response);

      if (response.success) {
        // Browser popup removed
        toast.success("Fee Updated Successfully");

        setSelectedFee(null);

        await loadFees();
      }
    } catch (error) {
      console.log("UPDATE ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update fee"
      );
    }
  };

  // =======================================
  // Delete Fee
  // =======================================

  const handleDelete = async (id) => {
    try {
      await deleteFee(id);

      toast.success("Fee Deleted Successfully");

      await loadFees();
    } catch (error) {
      console.log("DELETE FEE ERROR:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete fee"
      );
    }
  };

  // =======================================
  // Mark Fee as Paid
  // =======================================

  const handleMarkAsPaid = async (id) => {
    try {
      const response = await updateFeeStatus(
        id,
        "Paid"
      );

      console.log(
        "MARK PAID RESPONSE:",
        response
      );

      if (response.success) {
        toast.success(
          "Fee marked as Paid successfully"
        );

        await loadFees();
      }
    } catch (error) {
      console.log(
        "MARK PAID ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to update fee status"
      );
    }
  };

  // =======================================
  // Fee Calculations
  // =======================================

  const totalFees = fees.reduce(
    (total, fee) =>
      total + Number(fee.amount || 0),
    0
  );

  const paidAmount = fees
    .filter(
      (fee) => fee.status === "Paid"
    )
    .reduce(
      (total, fee) =>
        total + Number(fee.amount || 0),
      0
    );

  const pendingAmount = fees
    .filter(
      (fee) => fee.status === "Pending"
    )
    .reduce(
      (total, fee) =>
        total + Number(fee.amount || 0),
      0
    );

  // =======================================
  // UI
  // =======================================

  return (
    <AdminLayout>

      {/* ===================================
          HEADER
      =================================== */}

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Fee Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage student fees, payments and
            pending amounts.
          </p>
        </div>

        <button
          onClick={() =>
            setShowAddModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold"
        >
          + Add Fee
        </button>

      </div>

      {/* ===================================
          SUMMARY CARDS
      =================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* TOTAL */}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">

          <p className="text-sm text-blue-600 font-semibold">
            Total Fees
          </p>

          <h2 className="text-2xl font-bold text-blue-700 mt-2">
            ₹{totalFees.toLocaleString("en-IN")}
          </h2>

        </div>

        {/* PAID */}

        <div className="bg-green-50 border border-green-200 rounded-xl p-5">

          <p className="text-sm text-green-600 font-semibold">
            Paid Amount
          </p>

          <h2 className="text-2xl font-bold text-green-700 mt-2">
            ₹{paidAmount.toLocaleString("en-IN")}
          </h2>

        </div>

        {/* PENDING */}

        <div className="bg-red-50 border border-red-200 rounded-xl p-5">

          <p className="text-sm text-red-600 font-semibold">
            Pending Amount
          </p>

          <h2 className="text-2xl font-bold text-red-700 mt-2">
            ₹{pendingAmount.toLocaleString("en-IN")}
          </h2>

        </div>

      </div>

      {/* ===================================
          FEE TABLE
      =================================== */}

      {loading ? (

        <div className="bg-white rounded-xl shadow p-8 text-center">

          <p className="text-gray-500">
            Loading fees...
          </p>

        </div>

      ) : (

        <FeeTable
          fees={fees}
          onEdit={setSelectedFee}
          onDelete={handleDelete}
          onMarkAsPaid={handleMarkAsPaid}
        />

      )}

      {/* ===================================
          ADD FEE MODAL
      =================================== */}

      {showAddModal && (

        <AddFeeModal
          students={students}
          onClose={() =>
            setShowAddModal(false)
          }
          onSave={handleCreate}
        />

      )}

      {/* ===================================
          UPDATE FEE MODAL
      =================================== */}

      {selectedFee && (

        <UpdateFeeModal
          fee={selectedFee}
          onClose={() =>
            setSelectedFee(null)
          }
          onSave={handleUpdate}
        />

      )}

    </AdminLayout>
  );
}

export default Fees;