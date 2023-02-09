import express from "express";
import {
  createStatus,
  deleteStatus,
  getAllStatus,
  getStatus,
  updateStatus,
} from "../controllers/statusControllers.js";
import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/").post(createStatus).get(getAllStatus);

router.route("/:id").patch(updateStatus).delete(deleteStatus).get(getStatus);

export default router;
