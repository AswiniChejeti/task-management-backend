const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");
const {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} = require("../middlewares/validation");

// Register route (public)
router.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  userController.register,
);

// Login route (public)
router.post(
  "/login",
  validateLogin,
  handleValidationErrors,
  userController.login,
);

// Get profile route (protected)
router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
