import { useState } from "react";
import { sendPaymentNote } from "../services/feeService";
import toast from "react-hot-toast";
function FeeCard({ fee }) {
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [noteSent, setNoteSent] = useState(
    Boolean(fee.paymentNote)
  );

  const handleSendNote = async () => {
    if (!note.trim()) {
      toast.error("Please write a message to admin.");
      return;
    }

    try {
      setSending(true);

      await sendPaymentNote(fee._id, note);

      setNoteSent(true);
      setNote("");
    } catch (error) {
  console.error("PAYMENT NOTE ERROR:", error);

  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);

  toast.error(
    error.response?.data?.message ||
      error.message ||
      "Failed to send payment note"
  );
}  finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow p-5">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {fee.feeType}
        </h2>

        <span
          className={`px-3 py-1 rounded text-white ${
            fee.status === "Paid"
              ? "bg-green-600"
              : fee.status === "Partially Paid"
              ? "bg-yellow-500"
              : "bg-red-600"
          }`}
        >
          {fee.status}
        </span>
      </div>

      {/* Amount */}
      <p>
        <strong>Amount :</strong> ₹{fee.amount}
      </p>

      {/* Paid Amount */}
      <p className="mt-2">
        <strong>Paid Amount :</strong> ₹{fee.paidAmount}
      </p>

      {/* Due Date */}
      <p className="mt-2">
        <strong>Due Date :</strong>{" "}
        {new Date(fee.dueDate).toLocaleDateString()}
      </p>

      {/* ================= PAYMENT NOTE ================= */}

      {fee.status === "Pending" && !noteSent && (
        <div className="mt-5 border-t pt-4">

          <label className="block font-semibold mb-2">
            Payment Note to Admin
          </label>

          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Example: I have paid the hostel fee. Please verify and update my status."
            className="w-full border rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />

          <button
            onClick={handleSendNote}
            disabled={sending}
            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Note"}
          </button>

        </div>
      )}

      {/* ================= NOTE SENT ================= */}

      {fee.status === "Pending" && noteSent && (
        <div className="mt-5 border-t pt-4">

          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 font-semibold">
              ✅ Payment note sent to admin
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Waiting for admin verification.
            </p>
          </div>

        </div>
      )}

    </div>
  );
}

export default FeeCard;