import CategoryModel from "../models/CategoryModel.js";

export const CreateCategory = async (req, res, next) => {
  try {
    const newCategory = new CategoryModel({
      name: req.body.name,
      description: req.body.description,
    });
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const category = await CategoryModel.findByIdAndRemove(categoryId);
    if (!category) return createError(404, "Task not found");
    return res.status(200).json({ msg: "Status deleted successfully" });
  } catch (error) {
    next(error);
  }
};
