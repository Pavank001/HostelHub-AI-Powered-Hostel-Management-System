const express = require("express");
const router = express.Router();

const { chat,
    submitAIComplaint,

} = require("../controllers/aiController");
const { protect,
    authorize,
 } = require("../middleware/authMiddleware");

router.post("/chat", protect, chat);
router.post(
  "/submit-complaint",
  protect,
  authorize("student"),
  submitAIComplaint
);
module.exports = router;