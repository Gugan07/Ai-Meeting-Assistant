// Centralized error handler — catches all errors passed via next(error)
const errorHandler = (err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);

  const status = err.response?.status || 500;
  const message =
    err.response?.data?.error?.message ||
    err.message ||
    "Internal server error";

  res.status(status).json({ success: false, message });
};

module.exports = { errorHandler };
