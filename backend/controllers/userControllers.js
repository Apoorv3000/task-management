import User from "../models/UserModel.js";
import { createError } from "../utils/error.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({
      _id: { $ne: req.user.id },
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const searchUser = async (req, res, next) => {
  try {
    const query = req.query;
    const searchCondition = [];

    if (query.name) {
      searchCondition.push({ name: { $regex: query.name, $options: "i" } });
    }

    if (query.email) {
      searchCondition.push({ email: { $regex: query.email, $options: "i" } });
    }
    if (searchCondition.length === 0) {
      next(
        createError(400, "Name or email should be entered to search the user")
      );
    }
    const users = await User.find({ $or: searchCondition });

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
