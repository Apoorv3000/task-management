import express from "express";
import {
  assignTaskToUser,
  CreateTask,
  deletedTask,
  getTask,
  getTaskByStatus,
  getTasksByCategories,
  setPriorityOfTask,
  updateStatusOfTask,
  updateTask,
} from "../controllers/taskControllers.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyUser, CreateTask);

router.route("/:status").get(verifyUser, getTaskByStatus);

router.route("/search").get(verifyUser, getTasksByCategories);

router
  .route("/:id")
  .get(verifyUser, getTask)
  .patch(verifyUser, updateTask)
  .delete(verifyUser, deletedTask)
  .patch(verifyUser, setPriorityOfTask);

router.route("/:id/assign").put(verifyUser, assignTaskToUser);

router.route("/:id/status").put(verifyUser, updateStatusOfTask);

export default router;
