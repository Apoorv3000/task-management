import TaskModel from "../models/TaskModel.js";
import UserModel from "../models/UserModel.js";
import { createError } from "../utils/error.js";

export const CreateTask = async (req, res, next) => {
  try {
    const newTask = new TaskModel(req.body);
    const savedTask = await newTask.save();
    res.status(200).json(savedTask);
  } catch (error) {
    next(error);
  }
};

// all get methods
export const getTask = async (req, res, next) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) return next(createError(404, "Task not found"));
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTasksByCategories = async (req, res, next) => {
  try {
    const categories = req.query.categories;
    const tasks = await TaskModel.find({
      "categories.category_id": { $in: categories },
    }).populate("categories.category_id");

    if (!tasks) {
      return next(createError(404, "No tasks found"));
    }

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskByStatus = async (req, res, next) => {
  try {
    const status = req.params.status;

    const tasks = await TaskModel.find({ status });
    if (!tasks) {
      return next(createError(404, "Task with given status not found"));
    }
    return res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// all update methods
export const updateStatusOfTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const status = req.body.status;
    const task = await TaskModel.findById(taskId);
    if (!task) return next(createError(404, "Task not found"));

    task.status = status;
    await task.save();

    return res.status(200).send("Task status updated successfully");
  } catch (error) {
    next(error);
  }
};

export const setPriorityOfTask = async (req, res, next) => {
  try {
    const { priority } = req.body;

    if (!["High", "Medium", "Low"].includes(priority)) {
      return next(createError(400, "Invalid priority"));
    }

    const task = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { priority },
      { new: true }
    );

    if (!task) {
      return next(createError(404, "Task not found"));
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await TaskModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!task) return next(createError(404, "Task not found"));
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const assignTaskToUser = async (req, res, next) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.body.userId;

    const task = await TaskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return next(createError(404, "No user found"));
    }

    task.assignments.push(userId);
    await task.save();

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

//delete a task
export const deletedTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await TaskModel.findByIdAndRemove(taskId);
    if (!task) return createError(404, "Task not found");
    return res.status(200).json({ msg: "Task deleted successfully" });
  } catch (error) {
    next(error);
  }
};
