const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/auth");
const {
  validateCreateTask,
  validateUpdateTask,
  handleValidationErrors,
} = require("../middlewares/validation");

// All routes require authentication
router.use(authMiddleware);

// Create task
router.post(
  "/",
  validateCreateTask,
  handleValidationErrors,
  taskController.createTask,
);

// Get all tasks with pagination, filtering, and search
router.get("/", taskController.getTasks);

// Get task statistics
router.get("/stats", taskController.getTaskStats);

// Get single task
router.get("/:id", taskController.getTaskById);

// Update task
router.put(
  "/:id",
  validateUpdateTask,
  handleValidationErrors,
  taskController.updateTask,
);

// Delete task
router.delete("/:id", taskController.deleteTask);

module.exports = router;
