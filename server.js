require("dotenv").config();
const express = require("express");
const cors = require("cors");
const meetingRoutes = require("./routes/meetingRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Health check
app.get("/", (req, res) => res.json({ status: "OK", message: "Meeting Assistant API running" }));
app.get("/api/health", (req, res) => res.json({ status: "OK", message: "Meeting Assistant API running" }));

// Routes
app.use("/api/meeting", meetingRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found` }));

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GROQ_API_KEY loaded: ${!!process.env.GROQ_API_KEY}`);
  console.log(`Routes: POST /api/meeting/analyze`);
});
