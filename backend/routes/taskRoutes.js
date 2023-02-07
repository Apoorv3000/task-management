import express from "express";
import {
  CreateTask,
  getTaskByStatus,
  getTasksByCategories,
} from "../controllers/taskControllers.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyUser, CreateTask);

router.route("/:status").get(verifyUser, getTaskByStatus);

router.route("/search").get(verifyUser, getTasksByCategories);

export default router;
