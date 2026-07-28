// Validates that transcript field exists and is a non-empty string
const validateTranscript = (req, res, next) => {
  const { transcript } = req.body;
  if (!transcript || typeof transcript !== "string") {
    return res.status(400).json({ success: false, message: "transcript field is required." });
  }
  next();
};

module.exports = { validateTranscript };
