import express from "express";
import {
  createStatus,
  deleteStatus,
  getAllStatus,
  updateStatus,
} from "../controllers/statusControllers.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").post(verifyUser, createStatus).get(verifyUser, getAllStatus);

router
  .route("/:id")
  .patch(verifyUser, updateStatus)
  .delete(verifyUser, deleteStatus);

export default router;
