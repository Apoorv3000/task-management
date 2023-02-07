import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

// token validation

export const verifyToken = (req, res, next) => {
  const token = req?.cookies?.access_token;

  if (!token) {
    return res.status(401).json({ error: "You are not logged in " });
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(400, "Token is invalid"));
    req.user = user;

    next();
  });
};

//validate  users

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};
