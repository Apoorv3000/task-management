import express from "express";
import {
  CreateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryControllers.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").post(CreateCategory).get(getAllCategories);

router.route("/:id").delete(deleteCategory);

export default router;
