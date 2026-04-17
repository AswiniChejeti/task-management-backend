// Utility functions for common tasks

// Format error response
const formatErrorResponse = (message, errors = null) => {
  return {
    success: false,
    message,
    ...(errors && { errors }),
  };
};

// Format success response
const formatSuccessResponse = (message, data = null, pagination = null) => {
  return {
    success: true,
    message,
    ...(data && { data }),
    ...(pagination && { pagination }),
  };
};

// Validate MongoDB ObjectId
const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// Calculate pagination
const calculatePagination = (page, limit, total) => {
  return {
    page: Number(page),
    limit: Number(limit),
    total,
    pages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  };
};

module.exports = {
  formatErrorResponse,
  formatSuccessResponse,
  isValidObjectId,
  calculatePagination,
};
