import express from "express";

import { loginUser, logoutUser, registerUser } from "../controllers/auth.js";

import {
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/userControllers.js";

import { verifyUser } from "../middlewares/verifyToken.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/").get(getAllUsers);

router.route("/:id").get(getUser).delete(verifyUser, deleteUser);

export default router;
