const Complaint = require("../models/Complaint");
const { askAI } = require("../services/aiService");
const { getStudentContext } = require("../services/studentDataService");
exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const messageLower = message.toLowerCase();

    // ================= ROOM INTENT =================
    if (
      messageLower.includes("room") ||
      messageLower.includes("bed")
    ) {
      const context = await getStudentContext(req.user.id);

      const room = context.student.room;

      const prompt = `
Student asked:
${message}

Room Information:

Room Number: ${room.roomNumber}
Hostel Block: ${room.hostelBlock}
Floor: ${room.floor}
Room Type: ${room.roomType}

Answer only using this information.
`;

      const reply = await askAI(prompt);

      return res.json({
        success: true,
        reply,
      });
    }

    // ================= FEE INTENT =================
    if (
      messageLower.includes("fee") ||
      messageLower.includes("fees") ||
      messageLower.includes("payment") ||
      messageLower.includes("pending")
    ) {
      const context = await getStudentContext(req.user.id);

      const fees = context.pendingFees;

      if (fees.length === 0) {
        return res.json({
          success: true,
          reply: "🎉 You don't have any pending fees.",
        });
      }

      const prompt = `
Student asked:
${message}

Pending Fees:

${JSON.stringify(fees, null, 2)}

Answer only using this information.
`;

      const reply = await askAI(prompt);

      return res.json({
        success: true,
        reply,
      });
    }
          // ================= NOTICE INTENT =================
if (
  messageLower.includes("notice") ||
  messageLower.includes("announcement") ||
  messageLower.includes("notices")
) {
  const context = await getStudentContext(req.user.id);

  const notices = context.notices;

  if (notices.length === 0) {
    return res.json({
      success: true,
      reply: "There are no notices available at the moment.",
    });
  }

  const prompt = `
Student asked:
${message}

Latest Hostel Notices:

${JSON.stringify(notices, null, 2)}

Answer only using these notices.
Show them in a clean numbered list.
`;

  const reply = await askAI(prompt);

  return res.json({
    success: true,
    reply,
  });
}
    // ================= GENERAL AI =================
    const context = await getStudentContext(req.user.id);

    const prompt = `
You are HostelHub AI Assistant.

Student Information:
Name: ${context.student?.name}
Email: ${context.student?.email}

Room Details:
${JSON.stringify(context.student?.room, null, 2)}

Pending Fees:
${JSON.stringify(context.pendingFees, null, 2)}

Latest Notices:
${JSON.stringify(context.notices, null, 2)}

Student Question:
${message}

Instructions:
- Answer only using the hostel information provided above.
- If the requested information is not available, politely say so.
- Keep the answer short, clear, and professional.
`;

    const reply = await askAI(prompt);

    return res.status(200).json({
      success: true,
      reply,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.submitAIComplaint = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      priority,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const complaint = await Complaint.create({
      student: req.user.id,
      title,
      description,
      category: category || "Other",
      priority: priority || "Medium",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Complaint submitted successfully.",
      complaint,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};