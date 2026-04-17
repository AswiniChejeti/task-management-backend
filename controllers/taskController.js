const taskService = require("../services/taskService");

// Create task
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.body, req.userId);
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Get all tasks
const getTasks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status, priority, search } = req.query;

    const filters = {};
    if (status) filters.status = status;
    if (priority) filters.priority = priority;
    if (search) filters.search = search;

    const result = await taskService.getTasks(req.userId, page, limit, filters);

    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully",
      data: result.tasks,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

// Get single task
const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.userId);
    res.status(200).json({
      success: true,
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Update task
const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body,
      req.userId,
    );
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// Delete task
const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id, req.userId);
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// Get task statistics
const getTaskStats = async (req, res, next) => {
  try {
    const stats = await taskService.getTaskStats(req.userId);
    res.status(200).json({
      success: true,
      message: "Task statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
};
