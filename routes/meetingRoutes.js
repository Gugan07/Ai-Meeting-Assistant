const express = require("express");
const router = express.Router();
const { analyzeMeeting } = require("../controllers/meetingController");
const { validateTranscript } = require("../middleware/validateRequest");
const rateLimit = require("express-rate-limit");

// Rate limiter: max 10 requests per minute per IP
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many requests. Please wait a minute." },
});

router.post("/analyze", limiter, validateTranscript, analyzeMeeting);

module.exports = router;
