require("dotenv").config();
const express = require("express");
const cors = require("cors");
const meetingRoutes = require("./routes/meetingRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/meeting", meetingRoutes);

// Health check
app.get("/", (req, res) => res.json({ status: "OK", message: "Meeting Assistant API running" }));
app.get("/api/health", (req, res) => res.json({ status: "OK", message: "Meeting Assistant API running" }));

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
