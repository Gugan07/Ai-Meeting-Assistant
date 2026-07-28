const { analyzeMeetingWithAI } = require("../services/aiService");

// POST /api/meeting/analyze
const analyzeMeeting = async (req, res, next) => {
  try {
    const { transcript } = req.body;

    if (!transcript || transcript.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: "Transcript must be at least 50 characters long.",
      });
    }

    const analysis = await analyzeMeetingWithAI(transcript.trim());

    res.json({ success: true, data: analysis });
  } catch (error) {
    next(error);
  }
};

module.exports = { analyzeMeeting };
