import express from "express";
import {
  CreateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryControllers.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router
  .route("/")
  .post(verifyUser, CreateCategory)
  .get(verifyUser, getAllCategories);

router.route("/:id").delete(verifyUser, deleteCategory);

export default router;
