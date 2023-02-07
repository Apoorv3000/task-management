import StatusModel from "../models/StatusModel.js";
import { createError } from "../utils/error.js";

export const createStatus = async (req, res, next) => {
  try {
    const newStatus = new StatusModel(req.body);
    const savedStatus = await newStatus.save();
    res.status(200).json(savedStatus);
  } catch (error) {
    next(error);
  }
};

export const getAllStatus = async (req, res, next) => {
  try {
    const status = await StatusModel.find();
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const status = await StatusModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!status) return next(createError(404, "No Status found"));
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

export const deleteStatus = async (req, res, next) => {
  try {
    const statusId = req.params.id;
    const status = await StatusModel.findByIdAndRemove(statusId);
    if (!status) return createError(404, "Task not found");
    return res.status(200).json({ msg: "Status deleted successfully" });
  } catch (error) {
    next(error);
  }
};
