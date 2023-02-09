import { createError } from "../utils/error.js";
import Status from "../models/StatusModel.js";

export const createStatus = async (req, res, next) => {
  try {
    const newStatus = new Status(req.body);
    const savedStatus = await newStatus.save();
    console.log(savedStatus);
    res.status(200).json(savedStatus);
  } catch (error) {
    next(error);
  }
};

export const getStatus = async (req, res, next) => {
  try {
    const status = await Status.findById(req.params.id);
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

export const getAllStatus = async (req, res, next) => {
  try {
    const status = await Status.find();
    res.status(200).json(status);
  } catch (error) {
    next(error);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const status = await Status.findByIdAndUpdate(
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
    const status = await Status.findByIdAndRemove(statusId);
    if (!status) return createError(404, "Task not found");
    return res.status(200).json({ msg: "Status deleted successfully" });
  } catch (error) {
    next(error);
  }
};
