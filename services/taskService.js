const Task = require("../models/Task");
const mongoose = require("mongoose");

// Create a new task
const createTask = async (taskData, userId) => {
  const task = new Task({
    ...taskData,
    userId,
  });
  return await task.save();
};

// Get all tasks with pagination, filtering, and search
const getTasks = async (userId, page = 1, limit = 10, filters = {}) => {
  const skip = (page - 1) * limit;

  // Build query
  const query = { userId };

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.priority) {
    query.priority = filters.priority;
  }

  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: "i" } },
      { description: { $regex: filters.search, $options: "i" } },
    ];
  }

  // Execute query
  const tasks = await Task.find(query)
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const totalTasks = await Task.countDocuments(query);
  const totalPages = Math.ceil(totalTasks / limit);

  return {
    tasks,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalTasks,
      totalPages,
    },
  };
};

// Get single task
const getTaskById = async (taskId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

// Update task
const updateTask = async (taskId, updateData, userId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updateData,
    { new: true, runValidators: true },
  );

  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

// Delete task
const deleteTask = async (taskId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) {
    throw new Error("Task not found");
  }
  return task;
};

// Get task statistics
const getTaskStats = async (userId) => {
  const stats = await Task.aggregate([
    {
      $match: { userId: new mongoose.Types.ObjectId(userId) },
    },
    {
      $facet: {
        totalTasks: [{ $count: "count" }],
        byStatus: [
          {
            $group: {
              _id: "$status",
              count: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ],
        byPriority: [
          {
            $group: {
              _id: "$priority",
              count: { $sum: 1 },
            },
          },
          {
            $sort: { _id: 1 },
          },
        ],
      },
    },
  ]);

  return {
    totalTasks: stats[0].totalTasks[0]?.count || 0,
    byStatus: stats[0].byStatus,
    byPriority: stats[0].byPriority,
  };
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats,
};
