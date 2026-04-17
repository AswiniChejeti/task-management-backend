const errorHandler = (err, req, res, next) => {
  // Default error status and message
  let status = err.status || 500;
  let message = err.message || "Internal Server Error";

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    status = 400;
    const messages = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
    message = `Validation Error: ${messages}`;
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    status = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
  }

  // Handle Mongoose Cast Error (invalid ObjectId)
  if (err.name === "CastError") {
    status = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    status = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    status = 401;
    message = "Token has expired";
  }

  console.error(`[ERROR] ${status} - ${message}`, err);

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? err : {},
  });
};

module.exports = errorHandler;
