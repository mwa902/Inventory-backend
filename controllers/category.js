import Category from "../models/category.js";

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching Category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const Category = await Category.findById(categoryId);
    if (!Category) {
      return res
        .status(404)
        .json({ error: "Category not found", message: error.message });
    }

    res.status(200).json({
      message: "Category Successful found",
      Category,
    });
  } catch (error) {
    console.error("Error fetching Category by ID:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    console.error("Error creating Category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updatedCategory = await User.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating Category:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

const deleteCategorybyId = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await User.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ error: "Category not found", message: error.message });
    }
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting Category:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export {
  getAllCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategorysbyId,
};
