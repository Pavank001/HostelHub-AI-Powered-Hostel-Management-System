const client = require("../config/openrouter");

const askAI = async (prompt) => {
  try {
    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        {
          role: "system",
          content:
            "You are HostelHub AI Assistant. Help students with hostel-related questions politely and professionally.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  askAI,
};
exports.submitAIComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

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