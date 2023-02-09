import express from "express";
import {
  assignTaskToUser,
  CreateTask,
  deletedTask,
  getAllTasks,
  getTask,
  getTaskByStatus,
  getTasksByCategories,
  setPriorityOfTask,
  updateStatusOfTask,
  updateTask,
} from "../controllers/taskControllers.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").post(CreateTask).get(getAllTasks);

router.route("/:column").get(getTaskByStatus);

router.route("/search").get(getTasksByCategories);

router
  .route("/:id")
  .get(getTask)
  .patch(updateTask)
  .delete(deletedTask)
  .patch(setPriorityOfTask);

router.route("/:id/assign").put(assignTaskToUser);

router.route("/:id/status").put(updateStatusOfTask);

export default router;
